<?php
// Simple mail test - no rate limiting
header('Content-Type: application/json');

$to = 'info@martiendejong.nl';
$subject = 'Test Email van PromotieMeester';
$message = '
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; padding: 20px; border-radius: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>PromotieMeester Mail Test</h2>
        </div>
        <p>Dit is een test email van promotiemeester.nl</p>
        <p><strong>Timestamp:</strong> ' . date('Y-m-d H:i:s') . '</p>
        <p><strong>Server:</strong> ' . $_SERVER['SERVER_NAME'] . '</p>
        <p>Als je deze email ontvangt, werkt de mail functionaliteit correct!</p>
    </div>
</body>
</html>
';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: PromotieMeester <info@promotiemeester.nl>\r\n";
$headers .= "Reply-To: info@promotiemeester.nl\r\n";

$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo json_encode([
        'success' => true,
        'message' => 'Test email sent to info@martiendejong.nl',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email',
        'error' => error_get_last()
    ]);
}
?>
