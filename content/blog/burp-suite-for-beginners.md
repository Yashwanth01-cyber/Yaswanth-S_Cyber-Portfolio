# Burp Suite for Beginners

Burp Suite is the industry-standard toolkit for web application security testing. This guide covers the essentials to get you intercepting and testing requests in minutes.

## Setup

1. Download Burp Suite Community Edition from PortSwigger.
2. Configure your browser to use Burp as a proxy on `127.0.0.1:8080`.
3. Install the Burp CA certificate so HTTPS traffic can be inspected.

## The core tools

### Proxy

The Proxy tab is where you intercept requests between your browser and the target server. Toggle interception on, browse the app, and inspect every HTTP request and response.

### Repeater

Send an intercepted request to Repeater to modify it manually and resend it repeatedly. This is where most manual testing happens — tweak a parameter, resend, observe the response.

### Intruder

Automate sending payloads across positions in a request. Useful for brute-forcing IDs, fuzzing parameters, and enumerating users.

## Your first test

1. Intercept a login request.
2. Send it to Repeater.
3. Modify the username parameter to include a single quote (`'`).
4. Send and observe whether the server returns a SQL error.

If you see an error, you may have found an injection point. Report it responsibly.

## Next steps

- Explore the Web Security Academy labs that map to Burp workflows.
- Learn to use Match & Replace rules for automation.
- Practice reading HTTP responses carefully — details reveal vulnerabilities.

Burp Suite rewards patience. Spend time understanding raw HTTP, and the tool becomes an extension of your own testing instincts.
