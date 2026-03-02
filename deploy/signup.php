<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Rate limiting - max 3 submits per IP per hour
function checkRateLimit($ip) {
    $rateLimitFile = __DIR__ . '/rate_limit.json';
    $now = time();
    $hourAgo = $now - 3600;

    $limits = file_exists($rateLimitFile) ? json_decode(file_get_contents($rateLimitFile), true) : [];

    // Clean old entries
    $limits = array_filter($limits, function($timestamp) use ($hourAgo) {
        return $timestamp > $hourAgo;
    });

    // Check if IP exceeded limit
    $ipAttempts = array_filter($limits, function($timestamp, $key) use ($ip) {
        return strpos($key, $ip) === 0;
    }, ARRAY_FILTER_USE_BOTH);

    if (count($ipAttempts) >= 3) {
        return false;
    }

    // Add current attempt
    $limits[$ip . '_' . $now] = $now;
    file_put_contents($rateLimitFile, json_encode($limits));

    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Honeypot check (bot trap)
    if (!empty($data['website'])) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Succesvol aangemeld']);
        exit;
    }

    // Rate limiting
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!checkRateLimit($ip)) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Te veel aanvragen. Probeer het over een uur opnieuw.']);
        exit;
    }

    // Timestamp check - form must take at least 2 seconds to fill
    $timestamp = intval($data['timestamp'] ?? 0);
    if ($timestamp === 0 || (time() - $timestamp) < 2) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Verdachte activiteit gedetecteerd.']);
        exit;
    }

    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $product = htmlspecialchars($data['product'] ?? 'Onbekend product');

    if (!$email) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Ongeldig email adres']);
        exit;
    }

    $adminEmail = 'info@promotiemeester.nl';
    $subject = "Nieuwe Early Access Aanmelding - $product";

    // Email naar admin
    $adminMessage = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 20px; border-radius: 10px; }
            .content { background: #f9fafb; padding: 20px; border-radius: 10px; margin-top: 20px; }
            .highlight { color: #f59e0b; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🎉 Nieuwe Early Access Aanmelding</h2>
            </div>
            <div class='content'>
                <p><strong>Product:</strong> <span class='highlight'>$product</span></p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Datum:</strong> " . date('d-m-Y H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: PromotieMeester <noreply@promotiemeester.nl>\r\n";

    // Email naar gebruiker (bevestiging)
    $userMessage = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 30px; border-radius: 10px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin-top: 20px; }
            .highlight { color: #f59e0b; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>👑 Welkom bij PromotieMeester!</h1>
            </div>
            <div class='content'>
                <h2>Bedankt voor je aanmelding</h2>
                <p>Je bent succesvol toegevoegd aan de early access lijst voor <span class='highlight'>$product</span>.</p>
                <p>We houden je op de hoogte zodra we live gaan. Bereid je voor om jouw online aanwezigheid naar een hoger niveau te tillen!</p>
                <p><strong>Wat kun je verwachten?</strong></p>
                <ul>
                    <li>✓ Exclusieve vroege toegang</li>
                    <li>✓ Speciale kortingen voor early adopters</li>
                    <li>✓ Persoonlijke onboarding</li>
                    <li>✓ Directe toegang tot nieuwe features</li>
                </ul>
            </div>
            <div class='footer'>
                <p>© 2026 PromotieMeester. Alle rechten voorbehouden.</p>
                <p>info@promotiemeester.nl</p>
            </div>
        </div>
    </body>
    </html>
    ";

    $userHeaders = "MIME-Version: 1.0\r\n";
    $userHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
    $userHeaders .= "From: PromotieMeester <info@promotiemeester.nl>\r\n";

    // Verzend beide emails
    $adminSent = mail($adminEmail, $subject, $adminMessage, $headers);
    $userSent = mail($email, "Welkom bij PromotieMeester Early Access - $product", $userMessage, $userHeaders);

    if ($adminSent && $userSent) {
        // Log de signup (optioneel)
        $logFile = __DIR__ . '/signups.log';
        $logEntry = date('Y-m-d H:i:s') . " | $email | $product\n";
        file_put_contents($logFile, $logEntry, FILE_APPEND);

        echo json_encode(['success' => true, 'message' => 'Succesvol aangemeld']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Er is iets misgegaan. Probeer het later opnieuw.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Alleen POST requests toegestaan']);
}
?>
