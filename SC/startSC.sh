# sclang -l ~/.config/Supercollider/sclang_config.yaml server.scd - &

rm command.fifi 2> /dev/null
mkfifo command.fifi
# ok, you have to make a redirection ???
cat command.fifi | sclang -u 57120 -l conf.yaml server.scd - &> sclang.log &



