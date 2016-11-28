// =====================================================================
// SuperCollider Workspace
// =====================================================================

(var a;

s.waitForBoot{
a="jack_lsp | grep darkice".unixCmdGetStdOut;
a.split(Char.nl).drop(-1).do{
	arg x, i; ("jack_connect SuperCollider:out_"++(i+1)++" "++x).unixCmd
}};

//"jack_di"

)
