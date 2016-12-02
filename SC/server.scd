// =====================================================================
// SuperCollider Workspace
// =====================================================================

(var a;

// open boot
s.waitForBoot{
a="jack_lsp | grep darkice".unixCmdGetStdOut;
a.split(Char.nl).drop(-1).do{
	arg x, i;
	// connect to darkice
	("jack_connect SuperCollider:out_"++(i+1)++" "++x).unixCmd;
	//disconnect from master
	("jack_disconnect SuperCollider:out_"++(i+1)++" "++"system:playback_"++(i+1)).unixCmd
}};

API.mountDuplexOSC;
//API.load("trucouf");

)

