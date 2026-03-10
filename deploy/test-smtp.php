<?php
header('Content-Type: application/json');

// SMTP Configuration
define('SMTP_HOST', 'mail.zxcs.nl');
define('SMTP_PORT', 587);
define('SMTP_USER', 'info@promotiemeester.nl');
define('SMTP_PASS', 'ZZPw8G4VuyREve4rWWeJ');
define('SMTP_FROM', 'info@promotiemeester.nl');
define('SMTP_FROM_NAME', 'PromotieMeester Test');

$debugLog = [];

// Set execution time limit
set_time_limit(30);

try {
    $debugLog[] = "Starting SMTP connection to " . SMTP_HOST . ":" . SMTP_PORT;

    // Connect to SMTP server (5 second timeout)
    $smtp = fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 5);
    if (!$smtp) {
        $debugLog[] = "Connection failed: $errstr ($errno)";
        echo json_encode(['success' => false, 'debug' => $debugLog]);
        exit;
    }
    $debugLog[] = "Connected successfully";

    // Read greeting
    $response = fgets($smtp, 515);
    $debugLog[] = "Greeting: " . trim($response);

    // Send EHLO
    fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
    $response = fgets($smtp, 515);
    $debugLog[] = "EHLO: " . trim($response);

    // Start TLS
    fputs($smtp, "STARTTLS\r\n");
    $response = fgets($smtp, 515);
    $debugLog[] = "STARTTLS: " . trim($response);

    if (substr($response, 0, 3) == '220') {
        // Enable crypto
        $cryptoResult = stream_socket_enable_crypto($smtp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $debugLog[] = "TLS enabled: " . ($cryptoResult ? "yes" : "no");

        if ($cryptoResult) {
            // Send EHLO again after TLS
            fputs($smtp, "EHLO " . SMTP_HOST . "\r\n");
            $response = fgets($smtp, 515);
            $debugLog[] = "EHLO after TLS: " . trim($response);

            // Authenticate
            fputs($smtp, "AUTH LOGIN\r\n");
            $response = fgets($smtp, 515);
            $debugLog[] = "AUTH LOGIN: " . trim($response);

            fputs($smtp, base64_encode(SMTP_USER) . "\r\n");
            $response = fgets($smtp, 515);
            $debugLog[] = "Username sent: " . trim($response);

            fputs($smtp, base64_encode(SMTP_PASS) . "\r\n");
            $response = fgets($smtp, 515);
            $debugLog[] = "Password sent: " . trim($response);

            if (substr($response, 0, 3) == '235') {
                $debugLog[] = "Authentication successful!";

                // Send test email
                fputs($smtp, "MAIL FROM: <" . SMTP_FROM . ">\r\n");
                $response = fgets($smtp, 515);
                $debugLog[] = "MAIL FROM: " . trim($response);

                fputs($smtp, "RCPT TO: <info@martiendejong.nl>\r\n");
                $response = fgets($smtp, 515);
                $debugLog[] = "RCPT TO: " . trim($response);

                fputs($smtp, "DATA\r\n");
                $response = fgets($smtp, 515);
                $debugLog[] = "DATA: " . trim($response);

                $testMessage = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">\r\n";
                $testMessage .= "To: <info@martiendejong.nl>\r\n";
                $testMessage .= "Subject: SMTP Test van PromotieMeester\r\n";
                $testMessage .= "MIME-Version: 1.0\r\n";
                $testMessage .= "Content-Type: text/html; charset=UTF-8\r\n";
                $testMessage .= "\r\n";
                $testMessage .= "<html><body>";
                $testMessage .= "<h2>SMTP Test Succesvol</h2>";
                $testMessage .= "<p>Deze test email is verstuurd van promotiemeester.nl via mail.zxcs.nl:587</p>";
                $testMessage .= "<p>Timestamp: " . date('Y-m-d H:i:s') . "</p>";
                $testMessage .= "</body></html>";
                $testMessage .= "\r\n.\r\n";

                fputs($smtp, $testMessage);
                $response = fgets($smtp, 515);
                $debugLog[] = "Message sent: " . trim($response);

                if (substr($response, 0, 3) == '250') {
                    $debugLog[] = "✓ Test email sent successfully!";
                    fputs($smtp, "QUIT\r\n");
                    fclose($smtp);

                    echo json_encode([
                        'success' => true,
                        'message' => 'Test email sent to info@martiendejong.nl',
                        'debug' => $debugLog
                    ]);
                    exit;
                }
            } else {
                $debugLog[] = "Authentication failed";
            }
        }
    }

    fputs($smtp, "QUIT\r\n");
    fclose($smtp);

    echo json_encode(['success' => false, 'message' => 'Failed to send test email', 'debug' => $debugLog]);

} catch (Exception $e) {
    $debugLog[] = "Exception: " . $e->getMessage();
    echo json_encode(['success' => false, 'error' => $e->getMessage(), 'debug' => $debugLog]);
}
?>
