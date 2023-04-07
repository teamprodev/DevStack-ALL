#include-once
#include <GUIConstantsEx.au3>
#include <Array.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>

#include <MyUDFs\Log.au3>
#include <MyUDFs\Env.au3>
#include <MyUDFs\Config.au3>

#include <MyUDFs\FileZ.au3>
#include <MyUDFs\Executer.au3>
#include <MyUDFs\Process.au3>

#include <MyUDFs\FileAssociation.au3>
#include <String.au3>
#include <MyUDFs\Dialogs.au3>
#include <MyUDFs\_ParseCSV.au3>
#include <MyUDFs\FileAssociation.au3>


Global $UDFName = 'ReplaceFileApp.au3'


$ext = 'efu'


#cs | INDEX | ===============================================

	Title				EsGo
	Description	 		EsGo

	Type				UDF
	AutoIt Version		3.3.14.0

	Author				Asror Zakirov (aka Asror.Z)
	E-Mail			 	Asror.ZK@gmail.com
	Created				03.03.2017

#ce	=========================================================




Global $exts



Switch $CmdLine[0]
    Case 1
        Local $file = $CmdLine[1]
        app($file)

        Sleep($sleepTime)


    Case Else
        If @ScriptName = $UDFName Then

            Local $file = 'd:\Develop\Projects\execut\MFTApp\ALL.appexe'
            Local $file = 'd:\Develop\Projects\ALL\Powers\ALL.appexe'
            Local $file = 'd:\Develop\Projects\installs\Archiver\WinRAR\Installer\ALL.appexe'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\Everything\Portable\ALL.appexe'
            Local $file = 'd:\Develop\Projects\execut\MFTApp\EFU\app.efu'
            app($file)

        Else

            If FileType_Add($ext) Then
                Mbox('FileType Add   ' & $ext)
            Else
                Mbox('Error with FileType_Add($ext)  ' & $ext)
            EndIf

        EndIf
EndSwitch










#cs | FUNCTION | ============================================

	Name				app
	Desc				

	Author				Asror Zakirov (aka Asror.Z)
	Created				2/2/2023

#ce	=========================================================
Func app($file, $clean = False)

    $parentFolder = _FZ_Name($file, $eFZN_ParentDir)

    Local $replace = FileOpenDialog('Choose replacement file', @ScriptDir & "\", "ALL files (*.*)", $FD_FILEMUSTEXIST)

    If @error Then Return _LogBox('No file is selected')

    $data = _ParseCSV($file)
    _Log($data)
    _Log('Files count: ' & UBound($data))

    For $i = 1 To Ubound($data)-1

        $fileName = $data[$i][0]
        _Log('Start $fileName: ' &$fileName)

        _FZ_Delete($fileName)
        
        $iRetval = _FZ_Copy($replace, $fileName)
        _Log('Success for $fileName: ' & $fileName)
		
    Next

EndFunc   ;==>app

