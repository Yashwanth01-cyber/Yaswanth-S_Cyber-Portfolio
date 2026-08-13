# Understanding the OWASP Top 10

The OWASP Top 10 is a standard awareness document that outlines the most critical security risks to web applications. It is updated regularly by the Open Worldwide Application Security Project (OWASP) community based on real-world incident data.

## Why it matters

Every developer and security professional should understand these categories. They represent the most common ways attackers compromise web applications, and addressing them covers a large portion of common attack surface.

## The categories

1. **Broken Access Control** — Users access resources or perform actions outside their intended permissions.
2. **Cryptographic Failures** — Sensitive data exposed due to weak or missing encryption.
3. **Injection** — Untrusted data sent to an interpreter, such as SQL injection.
4. **Insecure Design** — Missing security controls at the architecture level.
5. **Security Misconfiguration** — Default settings, verbose errors, or unnecessary features enabled.
6. **Vulnerable and Outdated Components** — Using libraries with known vulnerabilities.
7. **Identification and Authentication Failures** — Weak credential handling and session management.
8. **Software and Data Integrity Failures** — Untrusted CI/CD pipelines and unsigned updates.
9. **Security Logging and Monitoring Failures** — Missing or insufficient audit trails.
10. **Server-Side Request Forgery (SSRF)** — Server-side requests manipulated by an attacker.

## How to defend

- Enforce least privilege and deny-by-default access control.
- Validate and sanitize all input at trust boundaries.
- Keep dependencies updated and monitor advisories.
- Implement centralized logging and alerting.

Understanding the OWASP Top 10 is the foundation of secure coding. Start here, then go deeper into each category through PortSwigger's Web Security Academy labs.
