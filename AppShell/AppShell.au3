#include <MyUDFs\AppDev.au3>


#pragma compile(FileDescription, 'Adding Shell commands to Extension context menu')
#pragma compile(CompanyName, 'Smart Software Uzbekistan')


Global $UDFName = 'appShell.au3'

$type = 'appshell'


$appFile = 'd:\Develop\Projects\ALL\appShell\Testing\App\ALL.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Portable\au3.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\Power\Compile\ALL.appshell'
$appFile = 'd:\Develop\Projects\DevApp\IDEApp\PowerGUI\Portable\ALL.appshell'
$appFile = 'd:\Develop\Projects\FileApp\Extracts\Bioruebe Uniextract2\Portable\EXE.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Compiler\au3.appshell'
$appFile = 'd:\Develop\Projects\DevApp\Execute\AutoIT\Compiler\Folder.appshell'
cmdshell($type, $appFile, True, False)






#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)
	
	appShell($file, $clean)
  
EndFunc   ;==>app
