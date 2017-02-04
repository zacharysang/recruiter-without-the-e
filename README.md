# Recruiter-without-the-e

## Developing
```
# Install npm_modules
$npm install
# Start the express server
$npm start
# To run in dev mode
$npm run dev
# Run a specific service
$node services/[filename].js
```
### Private Keys
Keys should be managed using dotenv.
```
# Copy env.example to .env
$ cp env.example .env
```
Reference variables with
`process.env.VARNAME`

You should replace LT_SUBDOMAIN in .env with a unique subdomain.