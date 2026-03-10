<?php
// Reset rate limiting
$rateLimitFile = __DIR__ . '/rate_limit.json';

if (file_exists($rateLimitFile)) {
    unlink($rateLimitFile);
    echo json_encode(['success' => true, 'message' => 'Rate limit reset']);
} else {
    echo json_encode(['success' => true, 'message' => 'No rate limit file found']);
}
?>
