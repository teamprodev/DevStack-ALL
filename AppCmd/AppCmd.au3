#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Adding Executable Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'AppCmd.au3'

$type = 'appcmd'





$appFile = 'd:\Develop\Projects\ALL\AppShell\Testing\App\ALL.appshell'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\ALL.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\ALL\AppCmd\Test2.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\R-Drive Image\Portable\RDR.appcmd'
$appFile = 'd:\Develop\Projects\FileApp\Backups\TeraByte Image\Portable\ALL.appcmd'
$appFile = 'd:\Develop\Projects\DevApp\Versions\Git Shell\ALL.appcmd'
cmdshell($type, $appFile, True, False)









#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

 appCmd($file, $clean)

EndFunc   ;==>app
