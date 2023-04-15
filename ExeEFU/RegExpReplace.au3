#include-once
#include <GUIConstantsEx.au3>
#include <Array.au3>
#include <MyUDFs\ShellOpen.au3>
#include <MyUDFs\Es2.au3>
#include <MyUDFs\TC.au3>
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


Global $UDFName = 'RegExpReplace.au3'


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
                _Log('FileType Add   ' & $ext)
            Else
                _Log('Error with FileType_Add($ext)  ' & $ext)
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

    $parentFolder = _FZ_Name($file, $fzParentDir)

    $search = Inbox ('Search Text', '')
    $replace = Inbox ('Replace Text', '')

    $data = _ParseCSV($file)
    _Log($data)
    _Log('Files count: ' & UBound($data))


    For $i = 1 To Ubound($data)-1

        $fileName = $data[$i][0]
        _Log('Start $fileName: ' &$fileName)

		$content = _FZ_FileRead(@ScriptFullPath)
		
		
		
        Local $iRetval = _ReplaceStringInFile($fileName, $search, $replace)
        
        If $iRetval = -1 Then
            _Log('Error for $fileName: ' & $fileName)
        Else
            _Log('Success for $fileName: ' & $fileName)
        EndIf

    Next

EndFunc   ;==>app
