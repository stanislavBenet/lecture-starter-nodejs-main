export function getUserAgent(headers, agent, request) {
    let userAgent;
    if (headers === agent) {
        userAgent = request.query;
    } else {
        userAgent = request.body;
    }
    return userAgent;
}
