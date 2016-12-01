ServerOptions.devices;
ServerOptions.inDevices;
ServerOptions.outDevices;

server.default = Server.local;

s = Server.default.options;
s = Server.default;
s.options.device_("JackRouter");

Synth('default')

