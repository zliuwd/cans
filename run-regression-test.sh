#!/bin/sh

# REGRESSION TEST MODE

export set REGRESSION_TEST=true

# ENV URL

export set CANS_WEB_BASE_URL=https://web.integration.cwds.io/cans

# SUPERVISOR CREDENTIALS

export set SUPERVISOR_USERNAME=
export set SUPERVISOR_PASSWORD=
export set SUPERVISOR_VERIFICATION_CODE=

# WORKER CREDENTIALS

export set WORKER_USERNAME=
export set WORKER_PASSWORD=
export set WORKER_VERIFICATION_CODE=

rspec spec/acceptance/
