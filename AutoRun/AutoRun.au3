#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Adding to AutoRun for provided list of Apps')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AutoRun.au3'
Global $autoRoot = @ScriptDir


$type = 'autorun'





$appFile = 'd:\Develop\Projects\FileApp\Searchs\Everything\Portable\ALL.appauto'
$appFile = 'd:\FSystem\ALL\Security\Protects\KeePass\Portable\ALL.autorun'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

autorun($file, $clean)

EndFunc   ;==>app
