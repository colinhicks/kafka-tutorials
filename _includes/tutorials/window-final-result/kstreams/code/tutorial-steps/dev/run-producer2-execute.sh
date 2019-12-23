# In this case, we have defined a local function in one step, then we use it in the following step.
# Because the harness runner executes each step in a separate shell, we cannot simply execute the steps in order.
# However, we can work around the limitation of the test runner by including both sets of code in the same file,
# to be executed by a single shell:
source $(dirname "$0")/run-producer.sh
source $(dirname "$0")/run-producer2.sh
