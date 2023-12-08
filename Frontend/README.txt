https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

On Unix-like (Linux, macOS, Git bash, etc.):
export NODE_OPTIONS=--openssl-legacy-provider

On Windows command prompt:
set NODE_OPTIONS=--openssl-legacy-provider

On PowerShell:
$env:NODE_OPTIONS = "--openssl-legacy-provider"
