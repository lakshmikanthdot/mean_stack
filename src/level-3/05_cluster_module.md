normal node js -> one main js thread

multiple cores in machine
cluster module ->
by starting multiple node js worker process

each and every worker proces ->
its own node js runtime
its own v8 engine
its own event loop
its onw main js thread
its own memory

## incoming request

1. Primary Process
   -> cpu core 1
   -> cpu core 2
   -> cpu core 3
   -> cpu core 4

2. Shared server port
   -> cpu core 1
   -> cpu core 2
   -> cpu core 3
   -> cpu core 4
