'use strict';

const cMainGridWidth = 1700;
const cTitleGridCol1Width = 700;
const cTitleGridCol2Width = cMainGridWidth-cTitleGridCol1Width;

var GLoginFormHTMLPart1 =
'<div id="jqxLoginDlg">'+
'<div>';

var GLoginFormHTMLPart2 =
'</div>'+
'<div> '+
'<table align="left" style="margin: 0px auto;">'+
'<tr>'+
'  <td valign="top">'+
'   <br/>'+
'     <div>User ID (Login):</div><div><input type="text" id="inptApp_login"/></div>'+
'     <div>Password</div><div><input id="inptApp_password" type="password"/></div>'+
'     <table>'+
'     <tr>'+
'       <td><div>Mobile UI (beta)</div><div id="jqxMobileWebsite_Cb"></div></td>'+
'     </tr>'+
'     </table>'+
'  </td>'+
'</tr>'+
'<tr>'+
'  <td valign="bottom">'+
'      <div  style="float: none;">'+
'         <div style="float: none;">'+
'             <button id="Login_OK_btn">OK</button>'+ 
'              <button id="Login_Cancel_btn">Cancel</button>'+               
'          </div>'+
'      </div>'+          
'  </td>'+
'</tr>'+
'</table>'+

'</div>'+

'</div>';

var ChangeLoginFormHTML =
'<div id="jqxChangeLoginDlg">'+
'<div>Login</div>'+
'<div> '+
'<table align="left" style="margin: 0px auto;">'+
'<tr>'+
'  <td valign="top">'+
'   <br/>'+
'     <div><b>Change login details:</b></div>'+
'     <br>'+
'     <div>Current User ID:</div><div><input type="text" id="inptOldApp_login"/></div>'+
'     <div>Password</div><div><input id="inptOldApp_password" type="password"/></div>'+
'     <br>'+
'     <div>New User ID:</div><div><input type="text" id="inptNewApp_login"/></div>'+
'     <br>'+
'     <div>New Password</div><div><input id="inptNewApp_password" type="password"/></div>'+
'     <div>Repeat Password</div><div><input id="inptRepeat_password" type="password"/></div>'+
'  <br/>'+
'  </td>'+
'</tr>'+
'<tr>'+
'  <td valign="bottom">'+
'      <div  style="float: none;">'+
'         <div style="float: none;">'+
'             <button id="ChangeLogin_OK_btn">OK</button>'+
'              <button id="ChangeLogin_Cancel_btn">Cancel</button>'+
'          </div>'+
'      </div>'+
'  </td>'+
'</tr>'+
'</table>'+

'</div>'+

'</div>';

var GAuthCodeFormHTML =
'<div id="jqxAuthCodeDlg">'+
'<div>Second phase of Authentication</div>'+
'<div> '+
'<div>Please check your Email, input Auth Code here and press OK</div>'+
'<table align="left" style="margin: 0px auto;">'+
'<tr>'+
'  <td valign="top">'+
'   <br/>'+
'     <div>Auth Code:</div><div><input type="text" id="inptApp_AuthCode"/></div>'+
'  <br/><br/>'+
'  </td>'+
'</tr>'+
'<tr>'+
'  <td valign="bottom">'+
'      <div  style="float: none;">'+
'         <div style="float: none;">'+
'             <button id="AuthCode_OK_btn">OK</button>'+ 
'          </div>'+
'      </div>'+          
'  </td>'+
'</tr>'+
'</table>'+
'</div>'+
'</div>';

var GModelessAlertHTML =
'<div id="jqxModelessAlertDlg">'+
'<div>Status</div>'+
'<div> '+
'<table align="left" style="margin: 0px auto;">'+
'<tr>'+
'  <td valign="top">'+
'   <br/>'+
'     <div><span id="jqxModelessMessage">Preparing ...</span></div>'+
'  <br/>'+
'  </td>'+
'</tr>'+
'<tr>'+
'  <td valign="bottom">'+
'      <div  style="float: none;">'+
'         <div style="float: none;">'+
'          <button id="Alert_Cancel_btn">Cancel</button>'+
'          </div>'+
'      </div>'+
'  </td>'+
'</tr>'+
'</table>'+

'</div>'+

'</div>';

var InitMainForm;

var GClientToken = '';
var GIsmobileApplication = false;
var GIsTabletApplication = false;
var GProfileListChanged = true;
var GLastProfileStartedAt = 0;
var GProfileEditorFormOpen = false;

var ProfileEditorFormHTML = '';  
var ProfileEditorNavigationBarHTML = '';
var ProtocolSettingsFormHTML = '';
var ProgramSettingsFormHTML = '';
var EmailSettingsFormHTML = '';
var LoginFormHTML = "";

var GInternetProtDlgOpen = false;
var GReplaceCharactersOKClicked = false;

var Gb_MainBarOK = false;
var GbTabFiles = false;  // "Files" tab sheet created?
var GbTabFilesDeletions = false;  // "Files-Deletions" tab sheet created?
var Gb_TabSpecial = false;// 'Special tab/bar created'
var GbTabsComparisonMoreCreated = false; //Comparison->More tab/bar created
var GbTabsComparisonCreated=false;
var GTabMasksGeneralFilters = false;             
var GTabMasksFileAge = false;


var InternetProtSettingsTabsHTML_FTP = ""; 
var InternetProtSettingsTabsHTML_SFTP = "";
var InternetProtSettingsTabsHTML_SMB = "";
var InternetProtSettingsTabsHTML_GoogleDrive = "";
var InternetProtSettingsTabsHTML_GDriveRelevant = "";
var InternetProtSettingsTabsHTML_HTTP = "";
var InternetProtSettingsTabsHTML_AmazonS3 = "";
var InternetProtSettingsTabsHTML_Azure = "";
var InternetProtSettingsTabsHTML_Sharepoint = "";
var InternetProtSettingsTabsHTML_WebDAV = "";
var InternetProtSettingsTabsHTML_RSync = "";
var InternetProtSettingsTabsHTML_Glacier = "";
var HTML_RealTimeSettingsDlg = "";
var HTML_FoldersForDeletedFilesDlg = "";
var HTML_FoldersIntermediateLocationDlg = "";
var HTML_FileMaskRestrictionsDlg = "";
var HTML_FolderMasksDlg = "";

var HTML_RunAsUserDlg = "";
var HTML_ExecuteBeforeAfterDlg = "";
var HTML_Job_EmailSettingsDlg = "";
var LogFilesDlgHTML = "";
var HTML_SSHOptionsDlg = "";
var HTML_ChooseFolderFilesDlg = "";
var HTML_Special_PathsForCommunicationDlg = "";


var G_LoginFormDestroyed = false;
var GLastError = '';
var GSyncoveryTitle = 'Syncovery';
var GLicenseMsgBR = '';
var GLicenseMsg = '';
var GisSyncoveryWindows = false;
var GisSyncoveryLinux = false;
var GisSyncoveryMac = false;
var GAllowLZMA = true;
var GShowGuardianButtons = true;
var GShowPasswordHint = false;
var GAllowSZ = true;
var GAllowPascalScript = true;
var GPathDelim = '/';

var GDateFormat = 'dd.MM.yyyy';
var GShortTimeFormat = 'HH:mm';
var GLongTimeFormat = 'HH:mm:ss';
var GDefaultDate = '01.01.2017';
var GDecimalSeparator = '.';
var GThousandSeparator = ',';

var GIPTimeout = 60;
var GIPRetries = 2;
var GIPCustReplLocal;
var GIPCustReplServer;

var GIntermediateRightPath = "";
var GFolders_ContinueAfterInterimIncomplete = false;
var GFuncInitProfileEditorForm = null;

var GSelectedProfileName = "";

var GLeftProtocolName = "";
var GLeftUsername ="";
var GLeftPassword ="";
var GLeftStoredPath ="";

var GRightProtocolName = "";
var GRightUsername ="";
var GRightPassword ="";
var GRightStoredPath ="";

var GAddDestProtocolName = "";
var GAddDestUsername ="";
var GAddDestPassword ="";
var GAddDestStoredPath ="";
var GAddDestFTPSettings=[];

var GSubfolderSelections = "";

var GCommPathForLeftSide = "";
var GCommLocalPath1 = "";
var GCommPathForRightSide = "";
var GCommLocalPath2 = "";

var GJob_RunAsUser = "";
var GJob_RunAsDomain = "";
var GJob_RunAsPassword = "";

var GJob_ExecuteBefore = "";
var GJob_ExecuteAfter = "";

var Gcertificate_names = "";
var Gcertificates_private_keyfiles = "";
var Gcertificates_public_keyfiles = "";
          
var GSpecial_CacheDestinationFileList = false;
var GUsePascalScript = false;
var GPascalScript = "";

var GIntProtAbsolutePath = false;

var GAdvSpeedLimitData = [];
var GSpeedLimitAdvanced = false;

var GAdditionalDestsData = [];
var GAdditionalDests = false;
var GAddDestMode = 0;
var GAddDestATMBehavior=0;

// Advanced SSH Options dialog
var G_SSH_EncryptionAlgorithms = "";

var G_SSH_PublicKeyAlgorithms = "";
var G_SSH_MACAlgorithms = "";
var G_SSH_KeyExchangeAlgorithms = "";
var G_SSH_SFTPVersionSet = "";
var GCompressionLevel_SSH = 0;
var G_SSH_AutoAdjustCiphers = 0;
var G_SSH_AutoAdjustTransferBlock = 0;
var G_SSH_DownloadBlockSize = 0;
var G_SSH_UploadBlockSize = 0;
var G_SSH_SFTPBufferSize = 0;
var G_SSH_PipelineLength = 0;


var HTML_SmartTrackingSettingsDlg = "";
var HTML_ExactMirrorSettingsDlg = "";
var HTML_MoveSettingsDlg = "";
var HTML_ReplaceCharactersDlg = "";

//settings related to PC/Tablet mode
var GContextMenuHeight = null;
//Profile Editor
var GProfileSettingsDialogWidth = 1000;  
var GProfileSettingsDialogHeight = 840;
var GProfileSettingsTabControlWidth = GProfileSettingsDialogWidth - 50;
var GProfileSettingsTabControlHeight = 340;
var GBtnHeight = null;
var GBtnWidth = '80px';
var GBtnWidth2 = '120px';
var GBtnWidthMini = null;
var GChooseFolderFilesBtnWidth = null;

//Internet Protocol Settings
var GInternetProtSettingsDialogWidth = 810;  
var GInternetProtSettingsDialogHeight = 600;
var GInternetProtSettingsTabControlWidth = GInternetProtSettingsDialogWidth - 50;
var GInternetProtSettingsTabControlHeight = GInternetProtSettingsDialogHeight - 150;
var GDefaultGridToolbarHeight = 35;
var GDefaultTabletMouseDownInterval = 5;

var GProgramSettingsDlgWidth = 960;
var GProgramSettingsDlgHeight = 720;
var GProgramSettingsTabsHeight = 600;
var GProgramSettingsTabsWidth = 930;
    
// current list for InternetProtocolSettings dialog
var GCurrentList = null;

              
var MainFormHTMLPart1 =
            "<div id=\"titlegrid\"></div>";

var MainFormHTMLPart2 =
            "<div id=\"jqxgrid\">"+
            "<div id=\"jqxMenu\">"+
                "<ul>"+
                    "<li><a href=\"#\">Edit Profile</a></li>"+
                    "<li>Add New Profile</li>"+
                    "<li>Delete Profile</li>"+           
                    "<li>Rename Profile</li>"+           
                    "<li>Run Unattended</li>"+
                    "<li>Run With Preview</li>"+
                    "<li>Show Detailed Status</li>"+
                    "<li>Stop Profile</li>"+
                    "<li>Enable Profile</li>"+
                    "<li>Disable Profile</li>"+
                    "<li>Lock Profile Settings</li>"+
                    "<li>Unlock Profile Settings</li>"+
                    "<li>Pause Profile</li>"+
                    "<li>Resume Profile</li>"+
                    "<li>Diagnose Activity</li>"+
                    "<li>Import Profiles</li>"+
                    "<li>Import Binary Comparison Results From Log</li>"+
                    "<li>Export Profile</li>"+
                    "<li>Export All Profiles</li>"+
                    "<li>Terminate Process</li>"+
                "</ul>"+
            "</div>"+
    "</div>"; 

function GetTickCount()
{
   var d = new Date();
   return d.getTime();
}

function GetSelectedProfileName()
{
   var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
   var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
   if (selectedrowindex >= 0 && selectedrowindex < rowscount)
   {
      var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex).Name;
      return SelectedProfile.trim();
   }
   else
      return "";
};

function CheckError(p_Yes, p_Message)
{
   if (!p_Yes)
      alert(p_Message);
}

function LoadSSHDefaults()
{
  G_SSH_EncryptionAlgorithms = 0x1F7EFEFFF;

  G_SSH_PublicKeyAlgorithms = 0x1FFFFFFFFF;
  G_SSH_MACAlgorithms = 0x7FFFF;
  G_SSH_KeyExchangeAlgorithms = 0xFFFFF;
  G_SSH_SFTPVersionSet = 31;
  GCompressionLevel_SSH = 9;
  G_SSH_AutoAdjustCiphers = true;
  G_SSH_AutoAdjustTransferBlock = true;
  G_SSH_DownloadBlockSize = 8192;
  G_SSH_UploadBlockSize = 32768;
  G_SSH_SFTPBufferSize = 131072;
  G_SSH_PipelineLength = 32;
}
function EnsureSSHDefaults()
{
  if ((G_SSH_EncryptionAlgorithms==0) || (G_SSH_EncryptionAlgorithms=="") ||
      (G_SSH_PublicKeyAlgorithms==0) || (G_SSH_PublicKeyAlgorithms=="") ||
      (G_SSH_MACAlgorithms==0) || (G_SSH_MACAlgorithms=="") ||
      (G_SSH_KeyExchangeAlgorithms==0) || (G_SSH_KeyExchangeAlgorithms=="") ||
      (G_SSH_SFTPVersionSet==0) || (G_SSH_SFTPVersionSet=="") ||
      (G_SSH_DownloadBlockSize==0) || (G_SSH_DownloadBlockSize=="") ||
      (G_SSH_UploadBlockSize==0) || (G_SSH_UploadBlockSize=="") ||
      (G_SSH_SFTPBufferSize==0) || (G_SSH_SFTPBufferSize==""))
  {
      alert("Loading default Advanced SSH Settings, G_SSH_EncryptionAlgorithms:"+G_SSH_EncryptionAlgorithms+
            ", G_SSH_DownloadBlockSize:"+G_SSH_DownloadBlockSize+
            ", G_SSH_SFTPBufferSize:"+G_SSH_SFTPBufferSize);
      LoadSSHDefaults();
  }
}

function GetHTMLintoVar( htmlfilename, OutVarname )
{
  var client = new XMLHttpRequest();
  client.open( 'GET', '/' + htmlfilename );
  client.onreadystatechange = function()
  {
     if (client.readyState == XMLHttpRequest.DONE)
        window[OutVarname] = client.responseText;
  }
   client.send();
}


function deepCopy (arr) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var obj = {};
        for (var k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
}

function CreateSwitchButton(controlname, p_checked)
{
   var theControl = $("#" + controlname);
   var div_text = theControl.text();
   if (div_text != 'ON') //if already created in HTML then .text() == 'ON' and we just reinitialising component. This problem happens on modal dialogs.
   {
     var Res_SwitchButton = 
     '<table>'+
      '<tr>'+
        '<td><div id="'+ controlname+'"></div></td>'+
        '<td><div>'+div_text+'</div></td>'+
      '</tr>'+
     '</table>';
      theControl.replaceWith(Res_SwitchButton);
   }
    theControl.jqxSwitchButton( { width : 50, height : 25, offLabel: '', onLabel: 'ON', checked : p_checked});
}

function CreateCheckBox(controlname, p_width, p_height, p_OnChangeFunc)
{
   var theControl = $("#" + controlname);
   if (GIsTabletApplication)
   {
      CreateSwitchButton(controlname);
      theControl.on('change', p_OnChangeFunc);
   }
   else
   {
      if (((p_width != undefined) && (p_height != undefined) ) || ((p_width != null) && (p_height != null)) )
         theControl.jqxCheckBox({width : p_width, height : p_height});
      else
         theControl.jqxCheckBox();

      if ((p_OnChangeFunc != undefined) || (p_OnChangeFunc != null) )
      {
         theControl.on('change', p_OnChangeFunc);
      }
   }
}

function CreateCheckBoxWithValue(controlname,value)
{
  CreateCheckBox(controlname);
  SetCheckBoxValue(controlname,value);
}

function EnableCheckBox(controlname, p_val)
{
  if (p_val == undefined) // allow calling EnableCheckBox with only one parameter
     p_val = true;

  if (GIsTabletApplication)
  {
    if (p_val)
     $("#" + controlname).jqxSwitchButton('enable');
   else
     $("#" + controlname).jqxSwitchButton('disable');
  }
   else
  {
    if (p_val)
      $("#" + controlname).jqxCheckBox('enable');
    else
      $("#" + controlname).jqxCheckBox('disable');
  }

}

function DisableCheckBox(controlname, p_val)
{
  if (p_val == undefined)
     EnableCheckBox(controlname,false);
  else
     EnableCheckBox(controlname,!p_val);
}


function SetCheckBoxValue(controlname, p_val)
{
  if (GIsTabletApplication) 
    $("#" + controlname).jqxSwitchButton('checked', p_val);
   else
    $("#" + controlname).jqxCheckBox('val', p_val);
}

function GetCheckBoxValue(controlname)
{
  if (GIsTabletApplication) 
    return $("#" + controlname).jqxSwitchButton('checked'); 
   else  
    return $("#" + controlname).jqxCheckBox('val'); 
}

function InitGlobalVars(p_InitForMobile)
{

    if (p_InitForMobile)
    {
         GIsmobileApplication = true;
         GetHTMLintoVar('m_ProfileEditorForm.html', 'ProfileEditorFormHTML');
         GetHTMLintoVar('m_LogFilesDlg.html', 'LogFilesDlgHTML');
         GetHTMLintoVar('m_ProgramSettingsForm.html', 'ProgramSettingsFormHTML');
         
         
         //GetHTMLintoVar('m_ProfileEditorNavigationBar.html', 'ProfileEditorNavigationBarHTML');
         
          $.getScript('/programsettings.js', function()
          {
                                
          });
         
         

         /* $.getScript('/m_synapp_main_form.js', function()
          {

            
            $.getScript('/m_synapp_profile_editor_form.js', function()
            {


            });
                
          });
         */
         setTimeout(InitMainMobileForm, 100);
    }
    else
    {
         GetHTMLintoVar('ProfileEditorForm.html', 'ProfileEditorFormHTML');
         GetHTMLintoVar('ProtocolSettingsForm.html', 'ProtocolSettingsFormHTML');
         GetHTMLintoVar('ProgramSettingsForm.html', 'ProgramSettingsFormHTML');
         
         GetHTMLintoVar('InternetProtSettingsTabsHTML_FTP.html', 'InternetProtSettingsTabsHTML_FTP');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_GoogleDrive.html', 'InternetProtSettingsTabsHTML_GoogleDrive');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_HTTP.html', 'InternetProtSettingsTabsHTML_HTTP');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_Amazons3.html', 'InternetProtSettingsTabsHTML_AmazonS3');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_Azure.html', 'InternetProtSettingsTabsHTML_Azure');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_Sharepoint.html', 'InternetProtSettingsTabsHTML_Sharepoint');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_WebDAV.html', 'InternetProtSettingsTabsHTML_WebDAV');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_RSync.html', 'InternetProtSettingsTabsHTML_RSync');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_SFTP.html', 'InternetProtSettingsTabsHTML_SFTP');
	 if (!GisSyncoveryWindows)
            GetHTMLintoVar('InternetProtSettingsTabsHTML_SMB.html', 'InternetProtSettingsTabsHTML_SMB');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_Glacier.html', 'InternetProtSettingsTabsHTML_Glacier');
         GetHTMLintoVar('InternetProtSettingsTabsHTML_GDriveRelevant.html', 'InternetProtSettingsTabsHTML_GDriveRelevant');
         GetHTMLintoVar('LogFilesDlg.html', 'LogFilesDlgHTML');
         GetHTMLintoVar('SSHOptionsDlg.html', 'HTML_SSHOptionsDlg');
         GetHTMLintoVar('ChooseFolderFilesDlg.html', 'HTML_ChooseFolderFilesDlg');
         GetHTMLintoVar('Mask_FileMaskRestrictionsDlg.html', 'HTML_FileMaskRestrictionsDlg');
         GetHTMLintoVar('Mask_FolderMaskDlg.html', 'HTML_FolderMasksDlg');


         GetHTMLintoVar('SmartTrackingSettingsDlg.html', 'HTML_SmartTrackingSettingsDlg');
         GetHTMLintoVar('ExactMirrorSettingsDlg.html', 'HTML_ExactMirrorSettingsDlg');
         GetHTMLintoVar('MoveSettingsDlg.html', 'HTML_MoveSettingsDlg');
         //GetHTMLintoVar('EmailSettingsDlg.html', 'EmailSettingsFormHTML');


        $.getScript('/synapp_main_form.js', function()
        {

            setTimeout(InitMainForm, 100);

           /* $.getScript('/programsettings.js', function()
            {

                                
            });
          */
          /* $.getScript('/synapp_profile_editor_form.js', function()
            {


                $.getScript('/ChooseFolderFilesDlg.js', function()
                {

                                
                });                
                
                $.getScript('/synapp_dir_tree_form.js', function()
                {

                                
                });

                $.getScript('/synapp_internet_protocol_settings_form.js', function()
                {

                                
                });                
                
            });
            */
            if (GIsTabletApplication)
            {
               GContextMenuHeight = 520;  
               GDefaultGridToolbarHeight = 50;               
               GProfileSettingsDialogWidth = '100%';  
               GProfileSettingsDialogHeight = '100%';
               GProfileSettingsTabControlWidth = $(window).width() - 10;
               GProfileSettingsTabControlHeight = 260;
               GBtnHeight = 40;
               GBtnWidth = 100;
               GBtnWidth2 = 100;
               GBtnWidthMini = 40;
               GChooseFolderFilesBtnWidth = 250;

               GInternetProtSettingsDialogWidth = '100%';  
               GInternetProtSettingsDialogHeight = '100%';
               GInternetProtSettingsTabControlWidth = $(window).width() - 10;
               GInternetProtSettingsTabControlHeight = $(window).height() - 150;

               GProgramSettingsDlgWidth = '100%';
               GProgramSettingsDlgHeight = '100%';

               GProgramSettingsTabsHeight = $(window).height() - 150;
               GProgramSettingsTabsWidth = $(window).width() - 10;

               MainFormHTMLPart2 =
                      "<div id=\"jqxgrid\">"+
                      "<div id=\"jqxMenu\">"+
                          "<ul>"+
                              "<li></br><a href=\"#\">Edit Profile</a></br></li>"+
                              "<li></br>Add New Profile</br></li>"+
                              "<li></br>Delete Profile</br></li>"+
                              "<li></br>Rename Profile</br></li>"+
                              "<li></br>Run Unattended</br></li>"+
                              "<li></br>Run With Preview</br></li>"+
                              "<li></br>Show Detailed Status</br></li>"+
                              "<li></br>Stop Profile</br></li>"+
                              "<li></br>Enable Profile</br></li>"+
                              "<li></br>Disable Profile</br></li>"+
                              "<li></br>Lock Profile Settings</br></li>"+
                              "<li></br>Unlock Profile Settings</br></li>"+
                              "<li></br>Pause Profile</br></li>"+
                              "<li></br>Resume Profile</br></li>"+
                              "<li></br>Diagnose Activity</br></li>"+
                              "<li></br>Import Profiles</br></li>"+
                              "<li></br>Import Binary Comparison Results From Log</br></li>"+
                              "<li></br>Export Profile</br></li>"+
                              "<li></br>Export All Profiles</br></li>"+
                              "<li></br>Terminate Process</br></li>"+
                          "</ul>"+
                      "</div>"+
              "</div>";
            }
        });

        
/*
    <script type="text/javascript" src="synapp_main_form.js"></script> 
    <script type="text/javascript" src="synapp_profile_editor_form.js" async></script>
    <script type="text/javascript" src="synapp_dir_tree_form.js" async></script> 
    <script type="text/javascript" src="synapp_internet_protocol_settings_form.js" async></script> 
    <script type="text/javascript" src="programsettings.js" async></script> 
    <script type="text/javascript" src="ChooseFolderFilesDlg.js" async></script> 
    */
      }
            
}

function ConcatPath(a,b,delim)
{
  if (a=="")
     return b;
  else
     if (b=="")
        return a;
     else
       if (a[a.length-1]==delim)
          if (b[0]==delim)
             return a.substr(0,a.length-1)+b
          else
             return a+b;
       else
          if (b[0]==delim)
             return a+b;
          else
             return a+delim+b;
}

function GetJSONObject(funcName, params, withparamnames)
{
   var LURI='/' + funcName;
   var LResponse="";
   if (params.length>0)
   {
      if (withparamnames)
      {
        LURI = LURI + '?' + encodeURIComponent(params[0])+'='+encodeURIComponent(params[1]);
        var i;
        for (i = 2; i < params.length; i+=2)
        {
          LURI += '&' + encodeURIComponent(params[i])+'='+encodeURIComponent(params[i+1]);
        }
      }
      else
      {
        if ((funcName == 'parseftpurl') &&
            (params[0] == ''))
           return undefined;
        LURI = LURI + '?' + encodeURIComponent(params[0]);
        var i;
        for (i = 1; i < params.length; i++)
        {
          LURI += '&' + encodeURIComponent(params[i]);
        }
      }
   }
   try
   {
     var client = new XMLHttpRequest();  
     client.open('GET', LURI, false );
     client.send();   
     if (client.responseText == "")
        return null;
     LResponse=client.responseText;
     return JSON.parse(client.responseText);
   }
   catch(err) 
   {
      if (params.indexOf('login')>0)
         alert(err.message + ' in GetJSONObject('+funcName+'). Response='+LResponse);
      else
         alert(err.message + ' in GetJSONObject('+funcName+','+params+'). Response='+LResponse);
   }
}

function PostJsonObject( funcName, json_object )
{
  try
  {
     var xhr = new XMLHttpRequest();
    // xhr.open(form.method, form.action, true);
     xhr.open('POST', '/' + funcName, false );
     xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
     xhr.send(JSON.stringify(json_object));
     if (xhr.responseText != "OK")
        alert('PostJsonObject failed: '+xhr.responseText);
   }
   catch(err) 
   {
      alert(err.message + '  :PostJsonObject');      
   }    
}

function GetBaseProtocolName( ProtocolName )
{
   if (ProtocolName == 'FTP' )
     return 'FTP'; 
   else if (ProtocolName == 'SSH')
     return 'SSH';  
   else if (ProtocolName == 'SMB')
     return 'SMB';
   else if (ProtocolName == 'Amazon S3' )
     return 'Amazon S3';    
   else if (ProtocolName == 'HTTP' )  
     return 'HTTP';  
   else if (ProtocolName == 'Google Drive' )
     return 'Google Drive';
   else if ((ProtocolName == 'Sharepoint' ) || (ProtocolName == 'Graph' ))
     return 'Sharepoint';
   else
      if ((ProtocolName == 'OneDrvNew') ||
          (ProtocolName == 'OneDrive for Business') ||
          (ProtocolName == 'Box')  ||
          (ProtocolName == 'Hubic') ||
          (ProtocolName == 'PCloud')
        )
     return 'GDriveAlike';
   else
      if ((ProtocolName == 'DropBoxV2') ||
          (ProtocolName == 'Google Cloud Storage')
        )
     return 'GDriveAlikeWithContainer'
   else if (( ProtocolName == 'Azure' ) || ( ProtocolName == 'SugarSync' ) || ( ProtocolName == 'Rackspace' )
       || (ProtocolName == 'MediaFire') || ( ProtocolName == 'B2' ) || ( ProtocolName == 'Mega' ) )  
     return 'Azure';
   else if (ProtocolName == 'WebDAV' )
     return 'WebDAV';
   else if (ProtocolName == 'RSync' )
     return 'RSync';
   else if (ProtocolName == 'Glacier' )
     return 'Glacier';
   else return '';
}

function HasChangesBasedListing(ProtocolName)
{
   return (ProtocolName == 'Google Drive') ||
          (ProtocolName == 'DropBoxV2') ||
          (ProtocolName == 'Box') ||
          (ProtocolName == 'Sharepoint') ||
          (ProtocolName == 'Graph') ||
          (ProtocolName == 'OneDrvNew') ||
          (ProtocolName == 'OneDrive for Business');
}



 function GetCheckedRadiobuttonName( radiobutton1, radiobutton2, radiobutton3, radiobutton4, radiobutton5, radiobutton6 )
            {
               if (radiobutton1 != null && radiobutton1.jqxRadioButton('checked'))
                  return radiobutton1.attr("id");                
               else if (radiobutton2 != null && radiobutton2.jqxRadioButton('checked'))
                 return radiobutton2.attr("id"); 
               else if (radiobutton3 != null && radiobutton3.jqxRadioButton('checked'))
                 return radiobutton3.attr("id"); 
               else if (radiobutton4 != null && radiobutton4.jqxRadioButton('checked'))
                 return radiobutton4.attr("id"); 
               else if (radiobutton5 != null && radiobutton5.jqxRadioButton('checked'))
                 return radiobutton5.attr("id"); 
               else if (radiobutton6 != null && radiobutton6.jqxRadioButton('checked'))
                 return radiobutton6.attr("id"); 
            }

            function SetRadioGroupChecked(checked_id, radiobutton1, radiobutton2, radiobutton3, radiobutton4, radiobutton5, radiobutton6 )
            {
               if (( radiobutton1 != null ) && ( radiobutton1.attr("id") == checked_id ) )
               {
                 radiobutton1.jqxRadioButton('check');
               }
               else if (( radiobutton2 != null ) && ( radiobutton2.attr("id") == checked_id ) )
               {
                 radiobutton2.jqxRadioButton('check');
               }
               else if (( radiobutton3 != null ) && ( radiobutton3.attr("id") == checked_id ) )
               {
                 radiobutton3.jqxRadioButton('check');
               }
               else if (( radiobutton4 != null ) && ( radiobutton4.attr("id") == checked_id ) )
               {
                 radiobutton4.jqxRadioButton('check');
               }
               else if (( radiobutton5 != null ) && ( radiobutton5.attr("id") == checked_id ) )
               {
                 radiobutton5.jqxRadioButton('check');
               }
              else if (( radiobutton6 != null ) && ( radiobutton6.attr("id") == checked_id ) )
              {
                 radiobutton6.jqxRadioButton('check');
              }

            }

/*
function InitCheckboxes(RegistryList)
{
    for (var index = 0; index < RegistryList.length; index++)
    {  
        var RegistryItem = RegistryList[index];
        if (RegistryItem)
        {
          if (RegistryItem.controltype == "jqxCheckBox" )
          {
             if (RegistryItem.CheckedUnChecked)
                RegistryItem.CheckedUnChecked();
          }
        }
    }
}
*/

function ControlGroupMatchesExactly(regitemcg,wantedcg)
{
  if (regitemcg == wantedcg)
     return true;

  if ((regitemcg == "GDriveAlike") && (wantedcg=="GDriveAlikeWithContainer"))
     return true;

  if ((regitemcg == undefined) && (wantedcg==""))
     return true;
}

function GetRegistryListIndexByFieldName(RegistryList, ControlAppGroup, fieldname)
{
  for (var index = 0; index < RegistryList.length; index++)
  {
      var RegistryItem = RegistryList[index];
      if (( RegistryItem != undefined ) && 
          ControlGroupMatchesExactly(RegistryItem.ControlAppGroup,ControlAppGroup) && 
          ( RegistryItem.fieldname != undefined ) &&
          ( RegistryItem.fieldname == fieldname ) )
        return index;
  }
  return -1;
}

function LoadRecordToRegistryList(record, RegistryList, ControlAppGroup)
{
  try
  {
     for (var index = 0; index < RegistryList.length; index++)
     {
         var RegistryItem = RegistryList[index];

         if ((RegistryItem != undefined ) &&
             (ControlGroupMatchesExactly(RegistryItem.ControlAppGroup,ControlAppGroup) ||
              (RegistryItem.ControlAppGroup == '*')))
         {

           RegistryItem.LoadedToControl = false;
           if (record[ RegistryItem.fieldname ] == null )
           {
               RegistryItem.value = RegistryItem.default;
           }
           else
           {
             if (RegistryItem.controltype == "jqxCheckBox" )
             {
                RegistryItem.value = false;
                if (record[ RegistryItem.fieldname ] != "" )
                {
                   RegistryItem.value = record[ RegistryItem.fieldname ];
                }
             }
             else if (RegistryItem.controltype == "variable" )
             {
                if (( RegistryItem.type == 'decimal' ) && ( record[ RegistryItem.fieldname ] == '' ) )
                   RegistryItem.value = 0
                else
                   RegistryItem.value = record[ RegistryItem.fieldname ];
             }
             else if (RegistryItem.controltype == "jqxDropDownList" )
             {
                 RegistryItem.value = 0;
                 if (record[ RegistryItem.fieldname ] != "" )
                   RegistryItem.value = record[ RegistryItem.fieldname ];
             }
             else
                RegistryItem.value = record[ RegistryItem.fieldname ];
          }
        }

     }
  }
  catch(err)
  {
        alert(err.message + '  :LoadRecordToRegistryList, Stack: ' + err.stack);
  }
}

function LoadRegistryItemToControlByName( RegistryItemControlName )
{
    try
    {
      for (var index = 0; index < GProfileEditorRegistryList.length; index++)
      {
        var RegistryItem = GProfileEditorRegistryList[index];                              
        if ((RegistryItem != undefined) && (RegistryItem.controlname == RegistryItemControlName) )
        {
           LoadRegistryItemToControl( RegistryItem );  
           CheckError(RegistryItem.LoadedToControl == true, 'LoadRegistryItemToControlByName:  RegistryItem.LoadedToControl == false' );       
           return;
        }
      }
      alert(RegistryItemControlName + ' not found in registry. LoadRegistryItemToControlByName');
    }
    catch (err)
    {         
        alert(err.message + '  :LoadRegistryItemToControlByName');
    }
}

function LoadRegistryItemToControlByName2( RegistryItemControlName, RegistryList, ControlAppGroup, pWidth, ADefaultVal)
{
    try
    {
      for (var index = 0; index < RegistryList.length; index++)
      {
        var RegistryItem = RegistryList[index];
        if ((RegistryItem != undefined) &&
            (RegistryItem.controlname == RegistryItemControlName) &&
            (ControlGroupMatchesExactly(RegistryItem.ControlAppGroup,ControlAppGroup) ||
             (RegistryItem.ControlAppGroup == '*')))
        {
           if (pWidth != undefined)
              RegistryItem.width = pWidth;
           if (!RegistryItem.value && (ADefaultVal!=undefined))
           {
              //alert("LoadRegistryItemToControlByName2 falling back to default for "+RegistryItem.fieldname+": "  +
              //      ADefaultVal + " because RegistryItem.value=" + RegistryItem.value);
              RegistryItem.value = ADefaultVal;
            }
           LoadRegistryItemToControl(RegistryItem);
           CheckError(RegistryItem.LoadedToControl == true, 'LoadRegistryItemToControlByName2:  RegistryItem.LoadedToControl == false' );
           return;
        }
      }
      alert(RegistryItemControlName + ' not found in registry. LoadRegistryItemToControlByName2');
    }
    catch(err)
    {
        alert(err.message + '  :LoadRegistryItemToControlByName2');
    }
}

var GGlobalObject = this;

function LoadRegistryItemToControl(RegistryItem,mightnotexist)
{
  try
  {
     // check for variables first in order to speed up form loading
     // (all variables are set on loading)
     if (RegistryItem.controltype == "variable" )
     {

        if ((RegistryItem.value != undefined ) && ( RegistryItem.value != null ) &&
            ((RegistryItem.value != '') || (RegistryItem.type=="boolean"))) // unfortunately, false == ''
        {
           GGlobalObject[RegistryItem.controlname] = RegistryItem.value;
        }
        else
        {
           GGlobalObject[RegistryItem.controlname] = RegistryItem.default;
        }

        // set empty Boolean variables to false rather than an empty string
        if ((RegistryItem.type == "boolean") && (GGlobalObject[RegistryItem.controlname] == ""))
           GGlobalObject[RegistryItem.controlname] = false;

        RegistryItem.LoadedToControl = true;
     }
     else
     if (RegistryItem.controltype == "ButtonGroup" )
     {
        if (RegistryItem.value != null )
        {
          RegistryItem.setfunc( RegistryItem.value );
        }
        else
        {
          RegistryItem.setfunc( RegistryItem.default );
        }
        RegistryItem.LoadedToControl = true;
     }
     else
     {
       var theControl=($("#"+RegistryItem.controlname));

       if (!theControl.length)
       {
          //alert("theControl.length == " + theControl.length +
          //      ', ($("#"+RegistryItem.controlname)).length == ' +
          //      ($("#"+RegistryItem.controlname)).length);

          if (!mightnotexist)
             alert(RegistryItem.controlname + " does not exist, ignoring.");
          return;
       }

       if (RegistryItem.controltype == "jqxCheckBox" )
       {

          if (RegistryItem.value == null )
             RegistryItem.value = false;

          if (!GIsmobileApplication )
          {

            if (GIsTabletApplication)
            {
                //because of SwitchButton bug, checked state must be setup in constructor, to avoid double OnChage event
                var AChecked = RegistryItem.value;
                if (RegistryItem.OnInitCheckboxState != undefined )
                  AChecked = RegistryItem.OnInitCheckboxState();
                CreateSwitchButton(RegistryItem.controlname, AChecked);
                                                  
                // please do not do anything with checked state in OnGetValue
               if (RegistryItem.OnGetValue != undefined )
                    RegistryItem.OnGetValue();

                if (RegistryItem.disabled == true )
                   theControl.jqxSwitchButton( { disabled:true } );

           }
           else
           {
              var AChecked = RegistryItem.value;
              if (RegistryItem.OnInitCheckboxState != undefined )
              {
                AChecked = RegistryItem.OnInitCheckboxState();
              }
              if (RegistryItem.width != undefined)
                 theControl.jqxCheckBox( { width : RegistryItem.width, height : RegistryItem.height, checked: AChecked});
              else
                 theControl.jqxCheckBox( { checked: AChecked});

              theControl.jqxCheckBox( 'val', RegistryItem.value );

              if (RegistryItem.disabled == true )
                 theControl.jqxCheckBox( { disabled:true } );

              // please do not do anything with checked state in OnGetValue
              if (RegistryItem.OnGetValue != undefined )
                 RegistryItem.OnGetValue();
           }

         }
         else
         {
            theControl.jqxSwitchButton( { width : 50, height : 25, offLabel: ''});
            theControl.jqxSwitchButton( 'checked', RegistryItem.value );
                       
                       
            if (RegistryItem.disabled == true )
               theControl.jqxSwitchButton( { disabled:true } );
            //jqxSwitchButton on cahnge even if assigned here cause immedeate call. avoiding that.
         }
         RegistryItem.LoadedToControl = true;
       }
       else  if (RegistryItem.controltype == "jqxInput" )
       {
          if (RegistryItem.height == undefined )
             RegistryItem.height = 25;
          if (RegistryItem.width == undefined )
             RegistryItem.width = 100;
          if (RegistryItem.width > $(window).width() )
            RegistryItem.width = $(window).width() - 40;

          theControl.jqxInput({ width : RegistryItem.width, height : RegistryItem.height });
          theControl.jqxInput('val', RegistryItem.value);
                    
          if (RegistryItem.disabled == true )
             theControl.jqxInput( { disabled:true } );

          RegistryItem.LoadedToControl = true;
       }
       else  if (RegistryItem.controltype == "jqxListBox" )
       {

           if (RegistryItem.height == undefined )
             RegistryItem.height = 100;
          if (RegistryItem.width == undefined )
             RegistryItem.width = 100;
          var LBSource = [];
          if (RegistryItem.value != null )
              LBSource = RegistryItem.value.split('\n')
          theControl.jqxListBox({ width : RegistryItem.width, height : RegistryItem.height, source: LBSource });
                  
          RegistryItem.LoadedToControl = true;
       }
       else if (RegistryItem.controltype == "jqxRadioButton" )
       {
          theControl.jqxRadioButton({ groupName: RegistryItem.RadioGroupName , rtl: false});

          RegistryItem.LoadedToControl = true;
       }
       else  if (RegistryItem.controltype == "jqxPasswordInput" )
       {
          if (RegistryItem.height == undefined )
             RegistryItem.height = 25;
          if (RegistryItem.width == undefined )
             RegistryItem.width = 100;
          if (RegistryItem.width > $(window).width() )
            RegistryItem.width = $(window).width() - 40;
         theControl.jqxPasswordInput({ width: RegistryItem.width, height: RegistryItem.height, showStrength: RegistryItem.showStrength, showStrengthPosition: RegistryItem.showStrengthPosition });
         theControl.jqxPasswordInput('val',  RegistryItem.value );

          if (RegistryItem.disabled == true )
             theControl.jqxPasswordInput( { disabled:true } );
          RegistryItem.LoadedToControl = true;
       }
       else if (RegistryItem.controltype == "jqxDateTimeInput" )
       {
          if (RegistryItem.width<120)
             RegistryItem.width=120;
          theControl.jqxDateTimeInput({ width: RegistryItem.width, height: RegistryItem.height,
           formatString: RegistryItem.formatString, showCalendarButton: RegistryItem.showCalendarButton });//
          if ((RegistryItem.type == "time" ) || (RegistryItem.type == "string"))
          {
              theControl.jqxDateTimeInput({showTimeButton: true });
              theControl.jqxDateTimeInput('setDate',new Date(RegistryItem.value));
              //alert('Setting time ' + RegistryItem.formatString + ' to ' + RegistryItem.value +
              //      ', Result: '+ theControl.jqxDateTimeInput('val'));
          }
          else
          {
             theControl.jqxDateTimeInput('setDate',new Date(RegistryItem.value));
             //alert('Setting other ' + RegistryItem.formatString + ' to ' + RegistryItem.value +
             //      ', Result: '+ theControl.jqxDateTimeInput('val'));
             //theControl.val( RegistryItem.value );//jqxDateTimeInput('setDate', RegistryItem.value );
          }
          RegistryItem.LoadedToControl = true;
       }
       else  if (RegistryItem.controltype == "jqxNumberInput" )
       {
          var Ldigits = RegistryItem.decimalDigits;
          if (Ldigits && (Ldigits>0))
          {
             theControl.jqxNumberInput({ width : RegistryItem.width, height : RegistryItem.height, inputMode: 'simple',
                  decimalDigits: Ldigits, decimalSeparator: GDecimalSeparator, groupSeparator: GThousandSeparator});
          }
          else
          {
             theControl.jqxNumberInput({ width : RegistryItem.width, height : RegistryItem.height, inputMode: 'simple', decimalDigits: 0});
          }


          theControl.jqxNumberInput('val', RegistryItem.value);
          RegistryItem.LoadedToControl = true;
       }
       else  if (RegistryItem.controltype == "jqxFormattedInput" )
       {
          if (RegistryItem.width == undefined )
              RegistryItem.width = 60;
          if (RegistryItem.width > $(window).width() )
            RegistryItem.width = $(window).width() - 40;
                                                                              
          theControl.jqxFormattedInput({ width: RegistryItem.width, height: 25, radix: "decimal", value: "0", min: "0", spinButtons: RegistryItem.spinButtons, spinButtonsStep: 1 });
          theControl.val( RegistryItem.value );

          if (RegistryItem.maxvalue != undefined )
            theControl.jqxFormattedInput( { max: RegistryItem.maxvalue } );

          RegistryItem.LoadedToControl = true;
                      
       }
       else if (RegistryItem.controltype == "jqxDropDownList" )
       {
         if ((RegistryItem.value == null) || (RegistryItem.value<0))
            RegistryItem.value = 0;
         var a_width = 100;
         var a_height = 25;
         if (RegistryItem.width != undefined )
           a_width = RegistryItem.width;

         if (RegistryItem.height != undefined )
           a_height = RegistryItem.height;

         if (RegistryItem.OnLoadComboSource != undefined )
            RegistryItem.OnLoadComboSource(RegistryItem);

         //var ComboSource = [ RegistryItem.ComboSource ];
         theControl.jqxDropDownList( { source: RegistryItem.ComboSource, width: a_width, height: a_height, autoDropDownHeight: true} );
         if (RegistryItem.value>=RegistryItem.ComboSource.length)
            RegistryItem.value=0;
         theControl.jqxDropDownList( { selectedIndex: RegistryItem.value });


          if (RegistryItem.disabled == true )
             theControl.jqxDropDownList( { disabled:true } );

          theControl.find('input').attr('readonly', 'readonly');

          RegistryItem.LoadedToControl = true;
       }
     }

     // common properties for all control types
     if (RegistryItem.OnChange != undefined )
        theControl.on('change', RegistryItem.OnChange);
     if (RegistryItem.OnSelect != undefined )
        theControl.on('select', RegistryItem.OnSelect );
  }
  catch(err)
  {
          var mes = err.message + '  LoadRegistryItemToControl';
          if (RegistryItem != undefined )
             mes = mes + ' controlname:' + RegistryItem.controlname + ' controltype:' + RegistryItem.controltype +
                 ', stack: ' + err.stack;
          alert(mes);
  }
}

function LoadRegistryListToControls( RegistryList, ControlAppGroup )
{
  var RegistryItem = RegistryList[0];
  var index = 0;
  try
    {
      for (index = 0; index < RegistryList.length; index++)
      {
        RegistryItem = RegistryList[index];

        if (( RegistryItem != undefined ) &&
            ControlGroupMatchesExactly(RegistryItem.ControlAppGroup,ControlAppGroup) )
        {
          LoadRegistryItemToControl(RegistryItem,ControlAppGroup == '*');
        }
      };
   }
   catch(err)
   {
     var mes = err.message + '  LoadRegistryListToControls, index in list:' + index;
     if (RegistryItem != undefined )
        mes = mes + ' controlname:' + RegistryItem.controlname + ' controltype:' + RegistryItem.controltype + ' index in list:' + index+
               ', Stack: ' + err.stack;
     alert(mes);
   }
}

function LoadRegistryListToVariables(RegistryList)
{
     var RegistryItem = RegistryList[0];
     var index = 0;
     try
       {
            for (index = 0; index < RegistryList.length; index++)
            {
                RegistryItem = RegistryList[index];

                if (( RegistryItem != undefined ) && ( RegistryItem.controltype == "variable" ) )
                {
                  LoadRegistryItemToControl(RegistryItem);
                }
            };

      }
      catch(err)
      {
          var mes = err.message + '  LoadRegistryListToVariables' + ' index in list:' + index;
          if (RegistryItem != undefined )
             mes = mes + ' controlname:' + RegistryItem.controlname + ' controltype:' + RegistryItem.controltype + ' index in list:' + index;
          alert(mes);
      }
}


// loads defaults if RegistryItem.value = null or force load ForceDefaults == true
function LoadDefaultsToRegistryList( RegistryList, ForceDefaults )
{
  var RegistryItem = RegistryList[0];
  try
    {
         for (var index = 0; index < RegistryList.length; index++)
         {
           RegistryItem = RegistryList[index];

                
           if ((RegistryItem != undefined) && ((RegistryItem.value == null) || (RegistryItem.value == undefined) || ForceDefaults))
           {
               RegistryItem.LoadedToControl = false;
               if (RegistryItem.controltype == "jqxDateTimeInput" )
                  RegistryItem.value = GDefaultDate;
               else
                  RegistryItem.value = RegistryItem.default;
             }
          }
   }
   catch(err)
   {
       alert(err.message + ' index:'  + index +'  LoadDeafaultsToRegistryList');
   }
}


function ControlValuesToRegistryList(RegistryList, ControlAppGroup)
{
  var mightnotexist = (ControlAppGroup == "*");
  try
    {
       for (var index = 0; index < RegistryList.length; index++)
       {
         var RegistryItem = RegistryList[index];
         if (RegistryItem.LoadedToControl) // more efficient, and preserve values too
         {
           if (ControlGroupMatchesExactly(RegistryItem.ControlAppGroup,ControlAppGroup))
           {
             if (RegistryItem.controltype == "ButtonGroup" )
             {
                RegistryItem.value = RegistryItem.getfunc();
             }
             else if (RegistryItem.controltype == "variable" )
             {
                RegistryItem.value = GGlobalObject[RegistryItem.controlname];
             }
             else
             {
               var theControl = $("#" + RegistryItem.controlname);
               if (!theControl.length)
               {
                  if (!mightnotexist)
                     alert("Control named " + RegistryItem.controlname + " not found. Called from: "+(new Error()).stack);
                  continue;
               }
               if (RegistryItem.controltype == "jqxCheckBox" )
               {
                   if (!GIsmobileApplication)
                      RegistryItem.value = theControl.val();
                   else
                      RegistryItem.value = theControl.jqxSwitchButton('checked');
               }
               else if (RegistryItem.controltype == "jqxInput" )
               {
                  RegistryItem.value = theControl.jqxInput('val');
               }
               else if (RegistryItem.controltype == "jqxPasswordInput" )
               {
                  RegistryItem.value = theControl.jqxPasswordInput('val');
               }
               else if (RegistryItem.controltype == "jqxDateTimeInput" )
               {
                  var Ldt = theControl.jqxDateTimeInput('getDate');
                  if (Ldt!=undefined)
                  {
                     RegistryItem.value = Ldt.toJSON();
                  }
               }
               else  if (RegistryItem.controltype == "jqxFormattedInput" )
               {
                 RegistryItem.value = theControl.val();
               }
               else  if (RegistryItem.controltype == "jqxNumberInput" )
               {
                  RegistryItem.value = theControl.jqxNumberInput('getDecimal'); // better than val
               }
               else if (RegistryItem.controltype == "jqxDropDownList" )
               {
                  RegistryItem.value = theControl.jqxDropDownList('getSelectedIndex');
               }
             }
           }
         }
      }
   }
   catch(err)
   {
      if (!GIsmobileApplication)
       alert(err.message + '  ControlValuesToRegistryList');
   }
}

var bInsideShowReplaceCharactersDlg = false;

function ShowReplaceCharactersDlgClosed()
{
   bInsideShowReplaceCharactersDlg = false;
   EnableCheckBox('cbadv_replace_characters', true);
}

function EnableDisableCustomReplacements(p_Yes)
{
    $('#memLocal').jqxInput({disabled : !p_Yes});
    $('#memServer').jqxInput({disabled : !p_Yes});
}

function ShowReplaceCharactersDlg()
{
    if (bInsideShowReplaceCharactersDlg || !GInternetProtDlgOpen)
       return;

    // SMB has this checkmark on tab sheet 0!
    // if ($('#jqxInternetProtSettingsTabs').jqxTabs('selectedItem') != 1)
    //   return;

    bInsideShowReplaceCharactersDlg = true;
    EnableCheckBox('cbadv_replace_characters', false);

    $('#jqxReplaceCharactersDlg').jqxWindow({ maxWidth: 600,  width: 600, maxHeight:480, height:480, autoOpen: false, isModal: true,
                theme: 'energyblue', animationType: 'slide' });

     //GCurrentList assigned when DoInternetSettingsDialog

     LoadRegistryItemToControlByName2('cbReplaceColons', GCurrentList, '*');
     LoadRegistryItemToControlByName2('cbAutomatic', GCurrentList, '*');
     LoadRegistryItemToControlByName2('cbAutomaticWinCompatible', GCurrentList, '*');
     LoadRegistryItemToControlByName2('cbUploadUpperCase', GCurrentList, '*');
     LoadRegistryItemToControlByName2('cbUploadLowerCase', GCurrentList, '*');
     LoadRegistryItemToControlByName2('cbCustomReplacements', GCurrentList, '*');

     $('#cbCustomReplacements').on('change', function(event){
        EnableDisableCustomReplacements(event.args.checked);
     });

     EnableDisableCustomReplacements(GetCheckBoxValue('cbCustomReplacements'));

     LoadRegistryItemToControlByName2('memLocal', GCurrentList, '*', undefined, GIPCustReplLocal);
     LoadRegistryItemToControlByName2('memServer', GCurrentList, '*', undefined, GIPCustReplServer);

     $('#ReplaceCharacters_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
     $('#ReplaceCharacters_OK_btn').click(function () {

     GReplaceCharactersOKClicked=true;

     var b_replace_characters = false;
     var Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbReplaceColons');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbReplaceColons');
       if (GCurrentList[Ind].value == true) b_replace_characters = true;

     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbUploadUpperCase');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbUploadUpperCase');
       if (GCurrentList[Ind].value == true) b_replace_characters = true;

     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbUploadLowerCase');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbUploadLowerCase');  
       if (GCurrentList[Ind].value == true) b_replace_characters = true;  
     
     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbCustomReplacements');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbCustomReplacements');    
       if (GCurrentList[Ind].value == true) b_replace_characters = true;

     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbAutomatic');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbAutomatic');    
       if (GCurrentList[Ind].value == true) b_replace_characters = true;
  
     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_cbAutomaticWinCompatible');
     GCurrentList[Ind].value =  GetCheckBoxValue('cbAutomaticWinCompatible');

     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_replace_characters');
     GCurrentList[Ind].value = b_replace_characters;
    
  
     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_CustomReplacementsOtherSide');
     GCurrentList[Ind].value =  $("#memLocal").jqxInput('val');
     GIPCustReplLocal =GCurrentList[Ind].value;

     Ind = GetRegistryListIndexByFieldName(GCurrentList, '*', 'adv_CustomReplacementsServerSide');
     GCurrentList[Ind].value =  $("#memServer").jqxInput('val');
     GIPCustReplServer =GCurrentList[Ind].value;

     SetCheckBoxValue('cbadv_replace_characters', b_replace_characters);
     $('#jqxReplaceCharactersDlg').jqxWindow('close');
    });                

    $('#jqxReplaceCharactersDlg').jqxWindow('open'); 

   $('#jqxReplaceCharactersDlg').on('close',  function (event) {
      setTimeout(ShowReplaceCharactersDlgClosed, 2000);
   });
    

}


 function OnAdv_replace_charactersCb(event)
 {  
   if (bInsideShowReplaceCharactersDlg || !GInternetProtDlgOpen)
      return;

   // SMB has this checkmark on tab sheet 0!
   // if ($('#jqxInternetProtSettingsTabs').jqxTabs('selectedItem') != 1)
   //    return;

   EnableCheckBox('cbadv_replace_characters', false);

   if (HTML_ReplaceCharactersDlg == "")
   {
     var client = new XMLHttpRequest();
     client.open('GET', '/ReplaceCharactersDlg.html');
     client.onreadystatechange = function()
     {
       if (client.readyState == XMLHttpRequest.DONE)
       {
         HTML_ReplaceCharactersDlg = client.responseText;
         if (HTML_ReplaceCharactersDlg != "" )
         {
            $("#HTML_ReplaceCharactersDlg_div").html( HTML_ReplaceCharactersDlg );
            setTimeout(ShowReplaceCharactersDlg, 1000);
         }
       }
     }
     client.send();
    }
    else
       ShowReplaceCharactersDlg();
 };


              

            var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
                if (value < 20) {
                    return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
                }
                else {
                    return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
                }
            };


         var json = GetJSONObject( 'get_global_variables', []);
         Gcertificate_names = json.certificate_names;
         Gcertificates_private_keyfiles = json.private_keyfiles;
         Gcertificates_public_keyfiles = json.public_keyfiles;

         GisSyncoveryWindows = (json.isSyncoveryWindows == 'true');
         GisSyncoveryLinux = (json.isSyncoveryLinux == 'true');
         GisSyncoveryMac = (json.isSyncoveryMac == 'true');

         if (!GisSyncoveryWindows && !GisSyncoveryMac)
            GisSyncoveryLinux = true;

         GAllowLZMA = (json.allowLZMA == 'true');
         GShowPasswordHint = (json.showPasswordHint == 'true');
         GShowGuardianButtons = (json.showGuardianButtons == 'true');
         GAllowSZ = (json.allowSZ == 'true');
         GAllowPascalScript = (json.allowPascalScript == 'true');

         GDateFormat = json.dateFormat;
         GShortTimeFormat = json.shortTimeFormat;
         GLongTimeFormat = json.timeFormat;
         GDefaultDate = json.defaultDate;
         GDecimalSeparator = json.decimalSeparator;
         GThousandSeparator = json.thousandSeparator;

         GIPTimeout = json.global_ip_timeout;
         GIPRetries = json.global_ip_retries;

         GIPCustReplLocal = json.global_custrepl_local;
         GIPCustReplServer = json.global_custrepl_server;

         if (GisSyncoveryWindows)
         {
            GPathDelim = '\\';
         }

         GSyncoveryTitle = json.SyncoveryTitle;
         var LWindowTitle = json.SyncoveryWindowTitle;
         if ((LWindowTitle=='') || (LWindowTitle==undefined))
         {
            LWindowTitle = GSyncoveryTitle;
         }
         window.document.title = LWindowTitle;

         GLicenseMsg = json.LicenseMsg;
         if (GLicenseMsg!='')
            GLicenseMsgBR = ' - ';
         // alert(GLicenseMsg);


function ShowOneWayRadios()
{
  var onewaychecked=$('#SizeDiffIgnore').jqxRadioButton('val') || $('#SizeDiffCopy').jqxRadioButton('val');

  if (!onewaychecked)
  {
     if ($('#Copy_Left_To_Right_Radio_Mode').jqxRadioButton('val'))
        $('#SizeDiffIgnore').jqxRadioButton('val',true);
     else
        $('#SizeDiffCopy').jqxRadioButton('val',true);
  }

  $('#WhenFileSizeDifferentRadioGroupTwoWay').css({"display":"none"});
  $('#WhenFileSizeDifferentRadioGroupOneWay').css({"display":"block"});
}

function ShowTwoWayRadios()
{
  var onewaychecked=$('#SizeDiffIgnore').jqxRadioButton('val') || $('#SizeDiffCopy').jqxRadioButton('val');

  if (onewaychecked)
  {
    if ($('#SizeDiffIgnore').jqxRadioButton('val'))
       $('#Copy_Left_To_Right_Radio_Mode').jqxRadioButton('val',true);
    else
       $('#Ask_Radio_Mode').jqxRadioButton('val',true);
  }

  $('#WhenFileSizeDifferentRadioGroupTwoWay').css({"display":"block"});
  $('#WhenFileSizeDifferentRadioGroupOneWay').css({"display":"none"});
}

var GInsyncOperationModeEnableDisable=false;

function syncOperationModeEnableDisable()
{
  if (GInsyncOperationModeEnableDisable)
     return;

  GInsyncOperationModeEnableDisable=true; // avoid endless recursion

  var l2r = GetCheckBoxValue("jqxLeftToRightCb");
  var r2l = GetCheckBoxValue("jqxRightToLeftCb");
  // alert("syncOperationModeEnableDisable: l2r=="+l2r+", r2l="+r2l);
  if (l2r && r2l)
  {
     if (GbTabsComparisonCreated)
     {
        ShowTwoWayRadios();
     }
     //alert("2dir");
     var RadioOption = GetCheckedRadiobuttonName( $("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null );
     if (GbTabFiles) // Files tab sheet created?
     {
       if (GetCheckBoxValue("jqxFilesDetectMovedFilesCb") == false)
       {
           $("#Files_Left_Radio_Mode").jqxRadioButton( 'disabled', true );
           $("#Files_Right_Radio_Mode").jqxRadioButton( 'disabled', true );
           $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'disabled', true );
       }
       else
       {
         $("#Files_Left_Radio_Mode").jqxRadioButton( 'disabled', false );
         $("#Files_Right_Radio_Mode").jqxRadioButton( 'disabled', false );
         if (RadioOption == 'SmartTracking_Mode')
         {
            $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'disabled', false );
            // $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'check' ); don't enforce this
         }
         else
         {
            if ($("#Files_Automatic_Radio_Mode").jqxRadioButton('checked'))
               $("#Files_Right_Radio_Mode").jqxRadioButton( 'check' );
            $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'disabled', true );
         }
       }
             //Files
       DisableCheckBox("jqxFilesDoNotScanDestinationCb"); // two-way sync does not have this option

     }
     if (RadioOption != 'SmartTracking_Mode')
        SetRadioGroupChecked('Standard_Copying_Mode', $("#Standard_Copying_Mode") );
     $("#Exact_Mirror_Mode").jqxRadioButton({disabled: true});
     $("#Move_Files_Mode").jqxRadioButton({disabled: true});


      $("#Ask_Radio_Mode").jqxRadioButton( 'disabled', false );   
      $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton( 'disabled', false );   
      $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton( 'disabled', false );
      $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton( 'disabled', false );
      if (GbTabsComparisonMoreCreated)
      {
        // two-way sync does not have these options
        DisableCheckBox("jqxComparMoreAlwaysCopyFilesCb");
        DisableCheckBox("jqxComparMoreCaseSensitivityCb");
        DisableCheckBox("jqxComparMoreFolderTimesCb");
      }
      // Special
      if (Gb_TabSpecial)
        DisableCheckBox("jqxSpecialSpFeatr_CacheDestinationFileListCb"); // two-way sync does not have this option
  }
  else
  {
      if (GbTabsComparisonCreated)
      {
         ShowOneWayRadios();
      }
      //alert("1dir");
      $("#Exact_Mirror_Mode").jqxRadioButton({disabled: false});
      $("#Move_Files_Mode").jqxRadioButton({disabled: false});

      $("#Ask_Radio_Mode").jqxRadioButton( 'disabled', true );
      $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton( 'disabled', true );
      $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton( 'disabled', true );
      $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton( 'disabled', true );

      if (GbTabsComparisonMoreCreated)
      {
        EnableCheckBox("jqxComparMoreAlwaysCopyFilesCb"); // enabled for one-way syncs!
        EnableCheckBox("jqxComparMoreCaseSensitivityCb");
        EnableCheckBox("jqxComparMoreFolderTimesCb");
      }

      //Files
      if (GbTabFiles) // Files tab sheet created?
      {
        if (GetCheckBoxValue("jqxFilesDetectMovedFilesCb") == false)
        {
            //alert("not #jqxFilesDetectMovedFilesCb");
            $("#Files_Left_Radio_Mode").jqxRadioButton( 'disabled', true );
            $("#Files_Right_Radio_Mode").jqxRadioButton( 'disabled', true );
            $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'disabled', true );
        }
        else
        {
            //alert("#jqxFilesDetectMovedFilesCb");
            if (l2r)
            {
               //alert("l2r");
               $("#Files_Right_Radio_Mode").jqxRadioButton( 'disabled', false );
               $("#Files_Right_Radio_Mode").jqxRadioButton( 'check' );
               $("#Files_Left_Radio_Mode").jqxRadioButton( 'disabled', true );
            }
            else
            {
               //alert("r2l");
               $("#Files_Left_Radio_Mode").jqxRadioButton( 'disabled', false );
               $("#Files_Left_Radio_Mode").jqxRadioButton( 'check' );
               $("#Files_Right_Radio_Mode").jqxRadioButton( 'disabled', true );
            }
        }
        $("#Files_Automatic_Radio_Mode").jqxRadioButton( 'disabled', true );
        EnableCheckBox("jqxFilesDoNotScanDestinationCb"); // enabled
      }

      //Special
      if (Gb_TabSpecial)        
        EnableCheckBox("jqxSpecialSpFeatr_CacheDestinationFileListCb");  // enabled
      
  }

  GInsyncOperationModeEnableDisable=false;
};
        

var bInsideOfAdditionalDestsDlg = false;

function InsideOfAdditionalDestsDlgClose()
{
   bInsideOfAdditionalDestsDlg = false;
   if (GProfileEditorFormOpen)
      EnableCheckBox('cbAdditionalDests', true);
}

var AdditionalDestModes = ['Normal: Sync With Each Destination',
      'Simultaneous: Run Job Simultaneously For Each Destination',
      'Compare Only Against Main Destination, Copy To All Destinations',
      'Compare Only Against Main Destination, Copy To All Destinations Simultaneously',
      'Failover I: Try Next Destination if Connection Fails',
      'Failover II: Try Next Destination if Connection or Copying Fails'];

var AttendedModeBehaviors=['Run Only With Main Destination','Ask Which Destination to Use'];

function PasswordCreateEditor(row, cellValue, editor, cellText, width, height)
{
   const element = $('<input type="password" style="width: 100%; height: 100%;"/>');
   editor.append(element);
   element.jqxPasswordInput();
}

function PasswordInitEditor(row, cellValue, editor, cellText, width, height)
{
   const element = editor.find('input:first');
   element.jqxPasswordInput('val', cellValue);
}

function PasswordGetEditorValue(row, cellvalue, editor)
{
   const element = editor.find('input:first');
   return element.val();
}

function PasswordCellsRenderer(row, columnfield, value, defaulthtml, columnproperties)
{
   const element = `<input value="${value}" type="password" style="width: 100%; height: 100%;"/>`
   return element;
}

var GEditingAdditionalRow=0;

function AssignAdditionalPath()
{
  var LNewPath = $("#DummyEdit").jqxInput( 'val' );
  $("#grdAdditionalDests").jqxGrid('setcellvalue',GEditingAdditionalRow,"path",LNewPath);
}

function AddDestBrowseButtonClick(row)
{
  GEditingAdditionalRow=row; // 0-based
  GAddDestNum=row+1; // 1-based

  var thePath=$("#grdAdditionalDests").jqxGrid('getcelltext',row,"path");

  $("#DummyEdit").jqxInput('val',thePath);

  if ((thePath!='') && (thePath.indexOf("://")>=0))
  {
     PostProfileEditor("***BROWSEDUMMY***", "Browse",
       function()
       {
         InitDirTreeSelectForm($("#DummyEdit"), AssignAdditionalPath, "right");
       });
  }
  else
     InitDirTreeSelectForm($("#DummyEdit"),AssignAdditionalPath, "right");
}

function AddDestInternetButtonClick(row)
{
  GEditingAdditionalRow=row; // 0-based
  GAddDestNum=row+1; // 1-based

  GAddDestStoredPath=$("#grdAdditionalDests").jqxGrid('getcelltext',row,"path");
  GAddDestUsername=$("#grdAdditionalDests").jqxGrid('getcelltext',row,"user");
  GAddDestPassword=$("#grdAdditionalDests").jqxGrid('getcelltext',row,"pass");
  GAddDestProtocolName=$("#grdAdditionalDests").jqxGrid('getcelltext',row,"protocol");

  if (GAddDestProtocolName == "")
      GAddDestProtocolName = "FTP";

  $("#DummyEdit").jqxInput('val',GAddDestStoredPath);

  GAddDestFTPSettings=GAdditionalDestsData[row].ftpsettings;
  GInternetProtocolSetADDDESTRegistryList[indexOfListLoaded].ListLoaded = false;

  DoInternetSettingsDialog(GSelectedProfileName,
                           GInternetProtocolSetADDDESTRegistryList,
                           "adddest",
                           GAddDestProtocolName,
                           $("#DummyEdit"),
                           GAddDestStoredPath,
                           GAddDestUsername,
                           GAddDestPassword,
                           false);
}

function ApplyAddDestInternetSettings()
{
  $("#grdAdditionalDests").jqxGrid('setcellvalue',GEditingAdditionalRow,"path",GAddDestStoredPath);
  $("#grdAdditionalDests").jqxGrid('setcellvalue',GEditingAdditionalRow,"protocol",GAddDestProtocolName);

  // alert("Applying FTP Settings: "+JSON.stringify(GAddDestFTPSettings));

  if ((GAddDestProtocolName!="FTP") && (GAddDestProtocolName!="WebDAV") && // Milo was here
      (GAddDestProtocolName!="SSH") && (GAddDestProtocolName!="HTTP"))
     $("#grdAdditionalDests").jqxGrid('setcellvalue',GEditingAdditionalRow,"port","");
  else
     $("#grdAdditionalDests").jqxGrid('setcellvalue',GEditingAdditionalRow,"port",GAddDestFTPSettings.port);
}

var GSavedAddDestData=[];
var lastdeleterowtick=0;
var lastaddrowtick=0;

function ShowAdditionalDestsDlg()
{
   if (GIsmobileApplication || bInsideOfAdditionalDestsDlg)
      return;

   bInsideOfAdditionalDestsDlg = true;
   EnableCheckBox('cbAdditionalDests', false);

   $('#jqxAdditionalDestsDlg').jqxWindow({ maxWidth: 1000,  width: 1000, maxHeight:500, height:500, autoOpen: false, isModal: true,
                 theme: 'energyblue', animationType: 'slide' });

   function EnableDisableAdditionalDestsDlg()
   {
      var grEnabled = GetCheckBoxValue('cbSyncWithAddDests');
      $("#grdAdditionalDests").jqxGrid('disabled', !grEnabled);
   }

   CreateCheckBox('cbSyncWithAddDests', null, null, EnableDisableAdditionalDestsDlg);

   $("#cbAddDestMode").jqxDropDownList( { source: AdditionalDestModes, width: 600, autoDropDownHeight: true, selectedIndex:GAddDestMode });
   $("#cbAttendedModeBehavior").jqxDropDownList( { source: AttendedModeBehaviors, width: 300, autoDropDownHeight: true, selectedIndex:GAddDestATMBehavior });

   $("#DummyEdit").jqxInput({width:100});

   $('#cbSyncWithAddDests').val(GAdditionalDests);

   if (GAdditionalDestsData.length==0)
      GAdditionalDestsData =
         [{ "active" : true, "path" : "", "protocol" : "", "port" : 0, "user" :"", "pass":""}];


    GSavedAddDestData=deepCopy(GAdditionalDestsData);

    // prepare the data

    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'active', type: 'boolean'},
            { name: 'path', type : 'string'},
            { name: 'protocol', type : 'string'},
            { name: 'port', type: 'number' },
            { name: 'user', type: 'string' },
            { name: 'pass', type: 'string' }

        ],
        updaterow: function (rowid, rowdata, commit)
          {
            GAdditionalDestsData[rowdata.boundindex].active = rowdata.active;
            GAdditionalDestsData[rowdata.boundindex].path = rowdata.path;
            GAdditionalDestsData[rowdata.boundindex].protocol = rowdata.protocol;
            GAdditionalDestsData[rowdata.boundindex].port= rowdata.port;
            GAdditionalDestsData[rowdata.boundindex].user = rowdata.user;
            GAdditionalDestsData[rowdata.boundindex].pass = rowdata.pass;
            commit(true);
          },
        addrow: function (rowid, rowdata, position, commit)
          {
            // alert("Adding row at end");
            var curlen=GAdditionalDestsData.length;
            GAdditionalDestsData.length=curlen+1;
            GAdditionalDestsData[curlen] = { "active" : true, "path" : "", "protocol" : "", "port" : 0, "user" :"", "pass":""};
            commit(true);
          },
        deleterow: function (rowid, commit)
          {
            var rowidx = $("#grdAdditionalDests").jqxGrid('getrowboundindexbyid',rowid);

            // alert("Deleting row " + rowidx);
            for (var r=rowidx;r<GAdditionalDestsData.length-1;r++)
               GAdditionalDestsData[r]=GAdditionalDestsData[r+1];

            GAdditionalDestsData.length=GAdditionalDestsData.length-1;
            commit(true);
          },
        localdata: GAdditionalDestsData
    };
   var dataAdapter = new $.jqx.dataAdapter(source);

   var localizationobj = {decimalseparator: GDecimalSeparator, thousandsseparator: GThousandSeparator};

   $("#grdAdditionalDests").jqxGrid(
     {
       width: '100%',
       //height: '100%',

       rowsheight : 25,
       source: dataAdapter,
       pageable: false,
       pagesize:7,
       autoheight: true,
       virtualmode: false,
       rowdetails: false,
       showtoolbar: false,
       showstatusbar: false,
       showaggregates: false,
       selectionmode: 'singlecell',
       editable: true,
       localization: localizationobj,

       // cellsformat: GLongTimeFormat

       columns: [
         { text: '', datafield: 'active', columntype: 'checkbox', width: '3%' }, // checkmark
         { text: 'Path', datafield: 'path',  width: '50%'},

         { text: '', datafield: 'browse', columntype: 'button', width: '6%', // Browse Button
                     cellsrenderer: function () { return "Browse";},
                     buttonclick: AddDestBrowseButtonClick},

         { text: '', datafield: 'internet', columntype: 'button', width: '6%',
                     cellsrenderer: function () { return "Internet";}, // Internet Button
                     buttonclick: AddDestInternetButtonClick},

         { text: 'Protocol', datafield: 'protocol', width: '10%' },
         { text: 'Port', datafield: 'port', width: '5%' },
         { text: 'Username', datafield: 'user', width: '10%' },
         { text: 'Password', datafield: 'pass', width: '10%',
              columntype: 'custom',
              createeditor: PasswordCreateEditor,
              initeditor: PasswordInitEditor,
              geteditorvalue: PasswordGetEditorValue,
              cellsrenderer: PasswordCellsRenderer
         }
       ]
     });

     $("#AdditionalDests_OK_btn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#AdditionalDests_OK_btn").click(function ()
     {
        GAdditionalDests = GetCheckBoxValue('cbSyncWithAddDests');
        $('#cbAdditionalDests').val(GAdditionalDests);

        GAddDestMode=$("#cbAddDestMode").jqxDropDownList('getSelectedIndex');
        GAddDestATMBehavior=$("#cbAttendedModeBehavior").jqxDropDownList('getSelectedIndex');

        $("#jqxAdditionalDestsDlg").jqxWindow('close');
     });

     $("#AdditionalDests_Cancel_btn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#AdditionalDests_Cancel_btn").click(function ()
     {
        GAdditionalDestsData=GSavedAddDestData;

        // negate the checkmark because it was changed when clicked
        GAdditionalDests = !GetCheckBoxValue('cbAdditionalDests');
        $('#cbAdditionalDests').val(GAdditionalDests);

        $("#jqxAdditionalDestsDlg").jqxWindow('close');
     });

     $("#ADAddRowBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#ADAddRowBtn").click(function ()
     {
        if (GetTickCount()-lastaddrowtick<1000)
           return;
        $("#grdAdditionalDests").jqxGrid('addrow',null,{});
        lastaddrowtick=GetTickCount();
     });

     $("#ADDeleteRowBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#ADDeleteRowBtn").click(function ()
     {
        if (GetTickCount()-lastdeleterowtick<1000)
           return;
        var grd=$("#grdAdditionalDests");
        var selcell=grd.jqxGrid('getselectedcell');
        var selidx=(selcell ? selcell.rowindex : -1);
        if (selidx>=0)
           if (confirm("Are you sure you want to delete row "+(selidx+1)+", which contains the path '"+
               grd.jqxGrid('getcell',selidx,"path").value+"'?"))
              grd.jqxGrid('deleterow',grd.jqxGrid('getrowid',selidx));
        lastdeleterowtick=GetTickCount();
     });

     $("#ADCheckAllBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#ADCheckAllBtn").click(function ()
     {
        var grd=$("#grdAdditionalDests");
        for (var r=0;r<GAdditionalDestsData.length;r++)
           grd.jqxGrid('setcellvalue',r,"active",true);
     });

     $("#ADUncheckAllBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $("#ADUncheckAllBtn").click(function ()
     {
        var grd=$("#grdAdditionalDests");
        for (var r=0;r<GAdditionalDestsData.length;r++)
           grd.jqxGrid('setcellvalue',r,"active",false);
     });

     $('#jqxAdditionalDestsDlg').on('close', function (event)
     {
        setTimeout(InsideOfAdditionalDestsDlgClose, 2000);
     });

     $('#jqxAdditionalDestsDlg').jqxWindow('open');
     EnableDisableAdditionalDestsDlg()
  };

var HTML_AdditionalDestsDlg = "";

function EditAdditionalDestinations(event)
{
   if (HTML_AdditionalDestsDlg == "")
   {
      var client = new XMLHttpRequest();
      client.open('GET', '/AdditionalDestsDlg.html');
      client.onreadystatechange = function()
      {
         if (client.readyState == XMLHttpRequest.DONE)
         {
           HTML_AdditionalDestsDlg = client.responseText;
           if (HTML_AdditionalDestsDlg != "" )
           {
              $("#HTML_AdditionalDestsDlg_div").html( HTML_AdditionalDestsDlg );
              setTimeout(ShowAdditionalDestsDlg, 100);
           }
         }
      }
      client.send();
    }
    else
       ShowAdditionalDestsDlg();
}


var GProfileEditorRegistryList = new Array();

var reg_LeftToRight={fieldname:"LTR", type:"boolean", controlname:"jqxLeftToRightCb", controltype:"jqxCheckBox", default: true,
      OnChange : function()
        { syncOperationModeEnableDisable();
          EnableDisableComparison();
        }
      };

    GProfileEditorRegistryList.push(reg_LeftToRight);

var reg_RightToLeft={fieldname:"RTL", type:"boolean", controlname:"jqxRightToLeftCb", controltype:"jqxCheckBox" , default:false,
      OnChange : function()
        {
          syncOperationModeEnableDisable();
          EnableDisableComparison();
        }
      };

    GProfileEditorRegistryList.push(reg_RightToLeft);

var reg_AdditionalDests={fieldname:"UseAdditionalDests", type:"boolean", controlname:"cbAdditionalDests", controltype:"jqxCheckBox", default: false,
                         OnChange : EditAdditionalDestinations};

    GProfileEditorRegistryList.push(reg_AdditionalDests);

GProfileEditorRegistryList.push({fieldname:"AddDestMode", type:"number", controlname:"GAddDestMode", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"AddDestATMBehavior", type:"number", controlname:"GAddDestATMBehavior", controltype:"variable", default: 0});


var reg_CaseSensitive={fieldname:"CaseSensitive", type:"boolean", controlname:"CaseSensitive", controltype:"jqxCheckBox", default:true};
   GProfileEditorRegistryList.push(reg_CaseSensitive);

   function ScheduleTabControlsEnableDisable()
   {
      if (GIsmobileApplication) return;
      if (GetCheckBoxValue('jqxScheduleThisProfileCb') == true )
      {
        EnableCheckBox("jqxSpecifyNextRunCb");
        EnableCheckBox("jqxIntervalSpecificationCb");
        $("#inptScheduleDays").jqxNumberInput( 'disabled', false );
        $("#inptScheduleHours").jqxNumberInput( 'disabled', false );
        $("#inptScheduleMinutes").jqxNumberInput( 'disabled', false );
        $("#inptScheduleSec").jqxNumberInput( 'disabled', false );
        $("#Run_Every_Day_Radio_Mode").jqxRadioButton( 'disabled', false );
        $("#Repeat_after_Radio_Mode").jqxRadioButton( 'disabled', false );
        $("#Repeat_monthly_Radio_Mode").jqxRadioButton( 'disabled', false );
        $("#Run_only_Once_Radio_Mode").jqxRadioButton( 'disabled', false );
        $("#jqxRun_Every_Day_Time_Input").jqxDateTimeInput( 'disabled', false );
        $("#jqxNextRunDay_Input").jqxDateTimeInput( 'disabled', false );
        $("#jqxNextRunTime_Input").jqxDateTimeInput( 'disabled', false );

        $('#jqxTabsSchedule').jqxTabs('enableAt', 2); 
        EnableCheckBox("jqxUseAdditionalTimes1Cb" );
        $("#jqxAdditionalTimes_Time_Input1").jqxDateTimeInput( 'disabled', false );
        EnableCheckBox("jqxUseAdditionalTimes2Cb" );
        $("#jqxAdditionalTimes_Time_Input2").jqxDateTimeInput( 'disabled', false );
        EnableCheckBox("jqxUseAdditionalTimes3Cb" );
        $("#jqxAdditionalTimes_Time_Input3").jqxDateTimeInput( 'disabled', false );
        EnableCheckBox("jqxUseAdditionalTimes4Cb" );
        $("#jqxAdditionalTimes_Time_Input4").jqxDateTimeInput( 'disabled', false );
      }
      else
      {
        DisableCheckBox("jqxSpecifyNextRunCb" );
        DisableCheckBox("jqxIntervalSpecificationCb" );
        $("#inptScheduleDays").jqxNumberInput( 'disabled', true );
        $("#inptScheduleHours").jqxNumberInput( 'disabled', true );
        $("#inptScheduleMinutes").jqxNumberInput( 'disabled', true );
        $("#inptScheduleSec").jqxNumberInput( 'disabled', true );
        $("#Run_Every_Day_Radio_Mode").jqxRadioButton( 'disabled', true );
        $("#Repeat_after_Radio_Mode").jqxRadioButton( 'disabled', true );
        $("#Repeat_monthly_Radio_Mode").jqxRadioButton( 'disabled', true );
        $("#Run_only_Once_Radio_Mode").jqxRadioButton( 'disabled', true );
        $("#jqxRun_Every_Day_Time_Input").jqxDateTimeInput( 'disabled', true );
        $("#jqxNextRunDay_Input").jqxDateTimeInput( 'disabled', true );
        $("#jqxNextRunTime_Input").jqxDateTimeInput( 'disabled', true );

        $('#jqxTabsSchedule').jqxTabs('disableAt', 2); 
        
        DisableCheckBox("jqxUseAdditionalTimes1Cb");
        $("#jqxAdditionalTimes_Time_Input1").jqxDateTimeInput( 'disabled', true );
        DisableCheckBox("jqxUseAdditionalTimes2Cb");
        $("#jqxAdditionalTimes_Time_Input2").jqxDateTimeInput( 'disabled', true );
        DisableCheckBox("jqxUseAdditionalTimes3Cb");
        $("#jqxAdditionalTimes_Time_Input3").jqxDateTimeInput( 'disabled', true );
        DisableCheckBox("jqxUseAdditionalTimes4Cb");
        $("#jqxAdditionalTimes_Time_Input4").jqxDateTimeInput( 'disabled', true );
        
      }
   };

var reg_ScheduleThisProfile={fieldname:"ScheduleThisProfile", type:"boolean", controlname:"jqxScheduleThisProfileCb", controltype:"jqxCheckBox", default:false,
   OnChange : function()
     { ScheduleTabControlsEnableDisable(); }
   };
   GProfileEditorRegistryList.push(reg_ScheduleThisProfile);

var reg_SpecifyNextRun={fieldname:"SpecifyNextRun", type:"boolean", controlname:"jqxSpecifyNextRunCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_SpecifyNextRun);

var reg_IntervalSpecification={fieldname:"IntervalSpecification", type:"boolean", controlname:"jqxIntervalSpecificationCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_IntervalSpecification);

 var reg_jqxScheduleRunUponWinLoginCb = {fieldname:"ScheduleRunUponWinLogin", type:"boolean", controlname:"jqxScheduleRunUponWinLoginCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleRunUponWinLoginCb);

 var reg_jqxScheduleRunUponShutdownOrRebootCb =  {fieldname:"ScheduleRunUponShutdownOrReboot", type:"boolean", controlname:"jqxScheduleRunUponShutdownOrRebootCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleRunUponShutdownOrRebootCb);

 var reg_jqxScheduleRunUponLogOutCb =  {fieldname:"ScheduleRunUponLogOut", type:"boolean", controlname:"jqxScheduleRunUponLogOutCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleRunUponLogOutCb);

 var reg_jqxScheduleRunMissedDaylyJobCb =  {fieldname:"ScheduleRunMissedDaylyJob", type:"boolean", controlname:"jqxScheduleRunMissedDaylyJobCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleRunMissedDaylyJobCb); 
 var reg_jqxScheduleAddRandomDelayUpToCb =  {fieldname:"ScheduleAddRandomDelayUpTo", type:"boolean", 
     controlname:"jqxScheduleAddRandomDelayUpToCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleAddRandomDelayUpToCb); 


 var reg_jqxScheduleWarnIfProfileNotRunForCb = {fieldname:"ScheduleWarnIfProfileNotRunFor", type:"boolean", 
     controlname:"jqxScheduleWarnIfProfileNotRunForCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxScheduleWarnIfProfileNotRunForCb); 
 var reg_jqxMondayCb = {fieldname:"Monday", type:"boolean", controlname:"jqxMondayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxMondayCb);
 var reg_jqxTuesdayCb = {fieldname:"Tuesday", type:"boolean", controlname:"jqxTuesdayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxTuesdayCb); 
 var reg_jqxWednesdayCb = {fieldname:"Wednesday", type:"boolean", controlname:"jqxWednesdayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxWednesdayCb); 
 var reg_jqxThursdayCb = {fieldname:"Thursday", type:"boolean", controlname:"jqxThursdayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxThursdayCb); 
 var reg_jqxFridayCb = {fieldname:"Friday", type:"boolean", controlname:"jqxFridayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFridayCb); 
 var reg_jqxSaturdayCb = {fieldname:"Saturday", type:"boolean", controlname:"jqxSaturdayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxSaturdayCb); 
 var reg_jqxSundayCb = {fieldname:"Sunday", type:"boolean", controlname:"jqxSundayCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxSundayCb); 
 var reg_jqxRealTimeSynchronizationCb =  {fieldname:"RealTimeSynchronization", type:"boolean", controlname:"jqxRealTimeSynchronizationCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxRealTimeSynchronizationCb);

function EnableDisableRealProfileAsSoonAsDriveAvailable()
{
   if (GIsmobileApplication) return;

   if ((GetCheckBoxValue("jqxRealProfileAsSoonAsDriveAvailableCb") == true)
         ||
       ( GetCheckBoxValue("jqxRealContinuousSyncCb") == true) )
   {

      $("#Real_Once_Mode").jqxRadioButton( 'disabled', false );
      $("#Real_Repeatedly_Mode").jqxRadioButton( 'disabled', false );
      EnableCheckBox("jqxRealUseMinimumPauseCb");
      $("#jqx_RealMonitoringIntervalMinutes").jqxNumberInput( 'disabled', false);
      $("#jqx_RealMonitoringIntervalSeconds").jqxNumberInput( 'disabled', false ); 
      $("#jqx_RealPauseHoursInput").jqxNumberInput( 'disabled', false ); 
      $("#jqx_RealPauseMinutesInput").jqxNumberInput( 'disabled', false );  
      $("#jqx_RealPauseSecondsInput").jqxNumberInput( 'disabled', false );

   }
   else
   {
      $("#Real_Once_Mode").jqxRadioButton( 'disabled', true ); 
      $("#Real_Repeatedly_Mode").jqxRadioButton( 'disabled', true );   
      DisableCheckBox("jqxRealUseMinimumPauseCb");   
      $("#jqx_RealMonitoringIntervalMinutes").jqxNumberInput( 'disabled', true );
      $("#jqx_RealMonitoringIntervalSeconds").jqxNumberInput( 'disabled', true ); 
      $("#jqx_RealPauseHoursInput").jqxNumberInput( 'disabled', true ); 
      $("#jqx_RealPauseMinutesInput").jqxNumberInput( 'disabled', true );  
      $("#jqx_RealPauseSecondsInput").jqxNumberInput( 'disabled', true );

   }
};

 var reg_jqxRealContinuousSyncCb = {fieldname:"RealContinuousSync", type:"boolean", controlname:"jqxRealContinuousSyncCb", controltype:"jqxCheckBox", default:false,
     OnChange : function()
       { EnableDisableRealProfileAsSoonAsDriveAvailable();}
     };
   GProfileEditorRegistryList.push(reg_jqxRealContinuousSyncCb);


 var reg_jqxRealProfileAsSoonAsDriveAvailableCb =  {fieldname:"RealProfileAsSoonAsDriveAvailable", type:"boolean", controlname:"jqxRealProfileAsSoonAsDriveAvailableCb", controltype:"jqxCheckBox", default:false,
     OnChange : function()
       { EnableDisableRealProfileAsSoonAsDriveAvailable();}
     };
   GProfileEditorRegistryList.push(reg_jqxRealProfileAsSoonAsDriveAvailableCb); 


   var reg_jqxFADatabaseSafeCopyCb = {fieldname:"FADatabaseSafeCopy", type:"boolean", controlname:"jqxFADatabaseSafeCopyCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFADatabaseSafeCopyCb); 
   var reg_jqxFATakeAdminOwnershipCb = {fieldname:"FATakeAdminOwnership", type:"boolean", controlname:"jqxFATakeAdminOwnershipCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFATakeAdminOwnershipCb); 
   var reg_jqxFAVerifyOpeningPriorCopyCb = {fieldname:"FAVerifyOpeningPriorCopy", type:"boolean", controlname:"jqxFAVerifyOpeningPriorCopyCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFAVerifyOpeningPriorCopyCb); 


function EnableDisableWaitingAndRetrying()
{
   if (GIsmobileApplication) return;
   if (GetCheckBoxValue("jqxWRBuildingFileListCb") == true || GetCheckBoxValue("jqxWRRunningTheProfileCb") == true )
   {

      $("#Re_Run_Once_Radio_Mode").jqxRadioButton( 'disabled', false ); 
      $("#Re_Run_Until_Success_Radio_Mode").jqxRadioButton( 'disabled', false );   
      $("#Max_Re_Runs_Radio_Mode").jqxRadioButton( 'disabled', false );
      $("#inptWRMaxReRuns").jqxFormattedInput( 'disabled', false ); 
      $("#inptWRRetryAfter").jqxFormattedInput( 'disabled', false );    
      EnableCheckBox("jqxWRAvoidRerunDueToLockedCb");         
   }
   else
   {
      $("#Re_Run_Once_Radio_Mode").jqxRadioButton( 'disabled', true ); 
      $("#Re_Run_Until_Success_Radio_Mode").jqxRadioButton( 'disabled', true );   
      $("#Max_Re_Runs_Radio_Mode").jqxRadioButton( 'disabled', true );
      $("#inptWRMaxReRuns").jqxFormattedInput( 'disabled', true ); 
      $("#inptWRRetryAfter").jqxFormattedInput( 'disabled', true );    
      DisableCheckBox("jqxWRAvoidRerunDueToLockedCb");         

   }  

   if (GetCheckBoxValue("jqxWRWaitForFileAccessCb") == true || GetCheckBoxValue("jqxWRWaitIfTransferProblemCb") == true )
   {
      $("#inptWRWaitUpToMin").jqxFormattedInput( 'disabled', false );          
   }
   else
   {
      $("#inptWRWaitUpToMin").jqxFormattedInput( 'disabled', true );          
   }

};


var reg_jqxWRWaitForFileAccessCb = {fieldname:"WRWaitForFileAccess", type:"boolean", controlname:"jqxWRWaitForFileAccessCb", controltype:"jqxCheckBox", default: true,

OnChange : function(){ EnableDisableWaitingAndRetrying();}};

   GProfileEditorRegistryList.push(reg_jqxWRWaitForFileAccessCb);

var reg_jqxWRWaitIfTransferProblemCb = {fieldname:"WRWaitIfTransferProblem", type:"boolean", controlname:"jqxWRWaitIfTransferProblemCb", controltype:"jqxCheckBox", default: true,
OnChange : function(){ EnableDisableWaitingAndRetrying();}};
   GProfileEditorRegistryList.push(reg_jqxWRWaitIfTransferProblemCb); 

var reg_jqxWRBuildingFileListCb = {fieldname:"WRBuildingFileList", type:"boolean", controlname:"jqxWRBuildingFileListCb", controltype:"jqxCheckBox", default: true,
   OnChange : function(){ EnableDisableWaitingAndRetrying();} };
   GProfileEditorRegistryList.push(reg_jqxWRBuildingFileListCb);
var reg_jqxWRRunningTheProfileCb = {fieldname:"WRRunningTheProfile", type:"boolean", controlname:"jqxWRRunningTheProfileCb", controltype:"jqxCheckBox", default:false,
OnChange : function(){ EnableDisableWaitingAndRetrying();}};
   GProfileEditorRegistryList.push(reg_jqxWRRunningTheProfileCb); 
   // Tabsheet Comparison Comparison


  function EnableDisableComparison()
  {
    if (GIsmobileApplication) return;

    if (GetCheckBoxValue("jqxComparIgnoreSmallTimeDiffCb") == true )
    {
      $("#inptComparIgnoreSec").jqxFormattedInput( 'disabled', false ); 
    }
    else
    {
      $("#inptComparIgnoreSec").jqxFormattedInput( 'disabled', true ); 
    }
    if (GetCheckBoxValue("jqxComparIgnoreExactHourTimeDiffCb") == true )
    {
      $("#inptComparIgnoreHours").jqxFormattedInput( 'disabled', false ); 
    }
    else
    {
      $("#inptComparIgnoreHours").jqxFormattedInput( 'disabled', true ); 
    }

     
    // jqxComparMoreBinaryLeftSideCb and RightSideCb are needed for other settings too,
    // so disabling them is not easy
    // we leave it away
  };

  var reg_jqxComparIgnoreSmallTimeDiffCb = {fieldname:"ComparIgnoreSmallTimeDiff", type:"boolean", controlname:"jqxComparIgnoreSmallTimeDiffCb", controltype:"jqxCheckBox", default: true ,
OnChange : function(){ EnableDisableComparison();}};
   GProfileEditorRegistryList.push(reg_jqxComparIgnoreSmallTimeDiffCb); 

 var reg_jqxComparIgnoreExactHourTimeDiffCb = {fieldname:"ComparIgnoreExactHourTimeDiff", type:"boolean", controlname:"jqxComparIgnoreExactHourTimeDiffCb", controltype:"jqxCheckBox", default: true,
OnChange : function(){ EnableDisableComparison();}
 };

   GProfileEditorRegistryList.push(reg_jqxComparIgnoreExactHourTimeDiffCb); 
 var reg_jqxComparIgnoreSecondsCb = {fieldname:"ComparIgnoreSeconds", type:"boolean", controlname:"jqxComparIgnoreSecondsCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparIgnoreSecondsCb); 
 var reg_jqxComparIgnoreTimestampAlltogetherCb =  {fieldname:"ComparIgnoreTimestampAlltogether", type:"boolean", controlname:"jqxComparIgnoreTimestampAlltogetherCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparIgnoreTimestampAlltogetherCb);

 // Tabsheet Comparison->More
 var reg_jqxComparMoreAlwaysCopyFilesCb = {fieldname:"ComparMoreAlwaysCopyFiles", type:"boolean", controlname:"jqxComparMoreAlwaysCopyFilesCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreAlwaysCopyFilesCb);

 var reg_jqxComparMoreBinaryComparisonCb = {fieldname:"ComparMoreBinaryComparison", type:"boolean", controlname:"jqxComparMoreBinaryComparisonCb", controltype:"jqxCheckBox", default:false,
      OnChange : function(){ EnableDisableComparison();}
      };
 GProfileEditorRegistryList.push(reg_jqxComparMoreBinaryComparisonCb);

 var reg_jqxComparMoreBinCompRememberCb = {fieldname:"ComparMoreBinCompRemember", type:"boolean", controlname:"jqxComparMoreBinCompRememberCb", controltype:"jqxCheckBox", default:true};
 GProfileEditorRegistryList.push(reg_jqxComparMoreBinCompRememberCb);

  var reg_jqxComparMoreBinaryLeftSideCb = {fieldname:"ComparMoreBinaryLeftSide", type:"boolean", controlname:"jqxComparMoreBinaryLeftSideCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreBinaryLeftSideCb);
  var reg_jqxComparMoreBinaryRightSideCb = {fieldname:"ComparMoreBinaryRightSide", type:"boolean", controlname:"jqxComparMoreBinaryRightSideCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreBinaryRightSideCb);
  var reg_jqxComparMoreFileAttrCb =  {fieldname:"ComparMoreFileAttr", type:"boolean", controlname:"jqxComparMoreFileAttrCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreFileAttrCb);

  if (GisSyncoveryWindows)
  {
     var reg_jqxComparMoreFolderAttrCb = {fieldname:"ComparMoreFolderAttr", type:"boolean", controlname:"jqxComparMoreFolderAttrCb", controltype:"jqxCheckBox", default:false};
     GProfileEditorRegistryList.push(reg_jqxComparMoreFolderAttrCb);
     var reg_jqxComparMoreDetectHardLinksCb = {fieldname:"ComparMoreDetectHardLinks", type:"boolean", controlname:"jqxComparMoreDetectHardLinksCb", controltype:"jqxCheckBox", default:false};
     GProfileEditorRegistryList.push(reg_jqxComparMoreDetectHardLinksCb);
  }
  var reg_jqxComparMoreCaseSensitivityCb = {fieldname:"ComparMoreCaseSensitivity", type:"boolean", controlname:"jqxComparMoreCaseSensitivityCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreCaseSensitivityCb);
  var reg_jqxComparMoreVerifySyncStatisticsCb =  {fieldname:"ComparMoreVerifySyncStatistics", type:"boolean", controlname:"jqxComparMoreVerifySyncStatisticsCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreVerifySyncStatisticsCb);
  var reg_jqxComparMoreFolderTimesCb = {fieldname:"ComparMoreFolderTimes", type:"boolean", controlname:"jqxComparMoreFolderTimesCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreFolderTimesCb);
  var reg_jqxComparMoreEnforceHardLinksCb =  {fieldname:"ComparMoreEnforceHardLinks", type:"boolean", controlname:"jqxComparMoreEnforceHardLinksCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxComparMoreEnforceHardLinksCb);
// Tabsheet Files

function EnableDisableFiles()
{
  //alert("EnableDisableFiles");

  if (GIsmobileApplication)
     return;

  syncOperationModeEnableDisable(); // does files stuff too

  EnableCheckBox("jqxFilesReCopyOnceCb", GetCheckBoxValue("jqxFilesVerifyCopiedFilesCb") == true);     
  
  $("#inptFilesMore_SpeedLimit").jqxNumberInput( 'disabled', !GetCheckBoxValue("jqxFilesMore_SpeedLimit"));
  $("#inptFilesMore_FilesPerRun").jqxFormattedInput( 'disabled', !GetCheckBoxValue("jqxFilesMore_CopyOnlyFilesPerRun"));
  $("#inptFilesMore_MBPerRun").jqxFormattedInput( 'disabled', !GetCheckBoxValue("jqxFilesMore_CopyOnlyMBPerRun"));
  //$("#inptFilesMore_FilesPerRun").jqxFormattedInput( 'width', 60);

  EnableCheckBox("jqxFilesMore_AndCompareFileDetails", GetCheckBoxValue("jqxFilesMore_CheckDestinationFile") == true);
  EnableCheckBox("jqxFilesMore_ViaInternetProtocolsToo", GetCheckBoxValue("jqxFilesMore_CheckDestinationFile") == true);
};


function EnableDisableMorePermissionsDlg()
{
   var ownmode=$("#jqxLinuxOwnerMode").jqxDropDownList('getSelectedIndex');
   var Lsetowner=ownmode== 3;
   $("#inptOwner").jqxInput( 'disabled', !Lsetowner);
   $("#inptGroup").jqxInput( 'disabled', !Lsetowner);

   var permmode=$("#jqxLinuxPermissionMode").jqxDropDownList('getSelectedIndex');
   var Lcopyperms=permmode== 7;
   $("#inptPerms").jqxInput( 'disabled', !permmode);

   EnableCheckBox('cbCompareOwner',ownmode==1);
   EnableCheckBox('cbCompareGroup',ownmode==1);
   EnableCheckBox('cbComparePermissions',permmode==1);
   EnableCheckBox('cbCompareACLs',permmode==1);
}


var reg_jqxFilesDetectMovedFilesCb = {fieldname:"FilesDetectMovedFiles", type:"boolean", controlname:"jqxFilesDetectMovedFilesCb", controltype:"jqxCheckBox", default: true,

 OnChange : EnableDisableFiles

 };
   GProfileEditorRegistryList.push(reg_jqxFilesDetectMovedFilesCb); 
   var reg_jqxFilesDetectRenamedFilesCb = {fieldname:"FilesDetectRenamedFiles", type:"boolean", controlname:"jqxFilesDetectRenamedFilesCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDetectRenamedFilesCb);
   var reg_jqxFilesVerifyCopiedFilesCb =  {fieldname:"FilesVerifyCopiedFiles", type:"boolean", controlname:"jqxFilesVerifyCopiedFilesCb", controltype:"jqxCheckBox", default:false,
 OnChange : EnableDisableFiles
 };
   GProfileEditorRegistryList.push(reg_jqxFilesVerifyCopiedFilesCb); 
 var reg_jqxFilesReCopyOnceCb = {fieldname:"FilesReCopyOnce", type:"boolean", controlname:"jqxFilesReCopyOnceCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesReCopyOnceCb);
 var reg_jqxFilesAutomaticallyResumeCb = {fieldname:"FilesAutomaticallyResume", type:"boolean", controlname:"jqxFilesAutomaticallyResumeCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesAutomaticallyResumeCb);
 var reg_jqxFilesProtectFromBeingReplacedCb = {fieldname:"FilesProtectFromBeingReplaced", type:"boolean", controlname:"jqxFilesProtectFromBeingReplacedCb", controltype:"jqxCheckBox", default: true};
   GProfileEditorRegistryList.push(reg_jqxFilesProtectFromBeingReplacedCb);
 var reg_jqxFilesDoNotScanDestinationCb = {fieldname:"FilesDoNotScanDestination", type:"boolean", controlname:"jqxFilesDoNotScanDestinationCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDoNotScanDestinationCb);
  var reg_jqxFilesBypassFileBufferingLeftCb = {fieldname:"FilesBypassFileBufferingLeft", type:"boolean", controlname:"jqxFilesBypassFileBufferingLeftCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesBypassFileBufferingLeftCb);
  var reg_jqxFilesBypassFileBufferingRightCb = {fieldname:"FilesBypassFileBufferingRight", type:"boolean", controlname:"jqxFilesBypassFileBufferingRightCb", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesBypassFileBufferingRightCb);
  // Tabsheet Files Deletions
  var reg_jqxFilesDeletions_OverwrittenFiles = {fieldname:"FilesDeletions_OverwrittenFiles", type:"boolean", controlname:"jqxFilesDeletions_OverwrittenFiles", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_OverwrittenFiles);
  var reg_jqxFilesDeletions_DeletedFiles =  {fieldname:"FilesDeletions_DeletedFiles", type:"boolean", controlname:"jqxFilesDeletions_DeletedFiles", controltype:"jqxCheckBox", default: true};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_DeletedFiles);
   var reg_jqxFilesDeletions_MoveFilesToSFolder = {fieldname:"FilesDeletions_MoveFilesToSFolder", type:"boolean", controlname:"jqxFilesDeletions_MoveFilesToSFolder", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_MoveFilesToSFolder);
   var reg_jqxFilesDeletions_DeleteOlderVersionsPermamently = {fieldname:"FilesDeletions_DeleteOlderVersionsPermamently", type:"boolean", controlname:"jqxFilesDeletions_DeleteOlderVersionsPermamently", controltype:"jqxCheckBox", default: true};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_DeleteOlderVersionsPermamently);
   var reg_jqxFilesDeletions_RememberDeletionTime = {fieldname:"FilesDeletions_RememberDeletionTime", type:"boolean", controlname:"jqxFilesDeletions_RememberDeletionTime", controltype:"jqxCheckBox", default: true};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_RememberDeletionTime);
   var reg_jqxFilesDeletions_DoubleCheckNonExistence = {fieldname:"FilesDeletions_DoubleCheckNonExistence", type:"boolean", controlname:"jqxFilesDeletions_DoubleCheckNonExistence", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_DoubleCheckNonExistence);
   var reg_jqxFilesDeletions_NeverDelete = {fieldname:"FilesDeletions_NeverDelete", type:"boolean", controlname:"jqxFilesDeletions_NeverDelete", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_NeverDelete);
   var reg_jqxFilesDeletions_DeleteBeforeCopying = {fieldname:"FilesDeletions_DeleteBeforeCopying", type:"boolean", controlname:"jqxFilesDeletions_DeleteBeforeCopying", controltype:"jqxCheckBox", default: true};
   GProfileEditorRegistryList.push(reg_jqxFilesDeletions_DeleteBeforeCopying);

   if (GisSyncoveryWindows)
   {
     // Tabsheet Files->More
     var reg_jqxFilesMore_UseWindowsApi = {fieldname:"FilesMore_UseWindowsApi", type:"boolean", controlname:"jqxFilesMore_UseWindowsApi", controltype:"jqxCheckBox", default:false};
     GProfileEditorRegistryList.push(reg_jqxFilesMore_UseWindowsApi);
   }
   else
   {
     // Security dialog
     var reg_jqxLinuxOwnerMode = {fieldname:"LinuxOwnerMode", type:"number", controlname:"GLinuxOwnerMode", controltype:"variable", default: "0"};
     GProfileEditorRegistryList.push(reg_jqxLinuxOwnerMode);

     GProfileEditorRegistryList.push({fieldname:"SetToOwner", type:"string", controlname:"GSetToOwner", controltype:"variable", default: ""});
     GProfileEditorRegistryList.push({fieldname:"SetToGroup", type:"string", controlname:"GSetToGroup", controltype:"variable", default: ""});

     var reg_jqxLinuxPermissionMode = {fieldname:"LinuxPermissionMode", type:"number", controlname:"GLinuxPermissionMode", controltype:"variable", default: "0"};
     GProfileEditorRegistryList.push(reg_jqxLinuxPermissionMode);

     GProfileEditorRegistryList.push({fieldname:"SetPermissions", type:"string", controlname:"GSetPermissions", controltype:"variable", default: ""});
   }

   var reg_jqxFilesMore_SpeedLimit = {fieldname:"FilesMore_UseSpeedLimit", type:"boolean", controlname:"jqxFilesMore_SpeedLimit", controltype:"jqxCheckBox", default:false,

OnChange : EnableDisableFiles

 };

GProfileEditorRegistryList.push(reg_jqxFilesMore_SpeedLimit);

GProfileEditorRegistryList.push({fieldname:"AdvSpeedLimitData", type:"array", controlname:"GAdvSpeedLimitData", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"AddDest", type:"array", controlname:"GAdditionalDestsData", controltype:"variable", default: ""});

var reg_jqxFilesMore_NeverReplace = {fieldname:"FilesMore_NeverReplace", type:"boolean", controlname:"jqxFilesMore_NeverReplace", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesMore_NeverReplace);
var reg_jqxFilesMore_AlwaysAppend = {fieldname:"FilesMore_AlwaysAppend", type:"boolean", controlname:"jqxFilesMore_AlwaysAppend", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesMore_AlwaysAppend);
var reg_jqxFilesMore_AlwaysConsider =  {fieldname:"FilesMore_AlwaysConsider", type:"boolean", controlname:"jqxFilesMore_AlwaysConsider", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFilesMore_AlwaysConsider);
var reg_jqxFilesMore_CheckDestinationFile = {fieldname:"FilesMore_CheckDestinationFile", type:"boolean", controlname:"jqxFilesMore_CheckDestinationFile", controltype:"jqxCheckBox", default: true,

OnChange : EnableDisableFiles

 };

GProfileEditorRegistryList.push(reg_jqxFilesMore_CheckDestinationFile);
var reg_jqxFilesMore_AndCompareFileDetails = {fieldname:"FilesMore_AndCompareFileDetails", type:"boolean", controlname:"jqxFilesMore_AndCompareFileDetails", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_AndCompareFileDetails);
var reg_jqxFilesMore_ViaInternetProtocolsToo = {fieldname:"FilesMore_ViaInternetProtocolsToo", type:"boolean", controlname:"jqxFilesMore_ViaInternetProtocolsToo", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_ViaInternetProtocolsToo);
var reg_jqxFilesMore_CopiedFilesSysTime = {fieldname:"FilesMore_CopiedFilesSysTime", type:"boolean", controlname:"jqxFilesMore_CopiedFilesSysTime", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_CopiedFilesSysTime);
var reg_jqxFilesMore_PreserveLastAccessOnSource = {fieldname:"FilesMore_PreserveLastAccessOnSource", type:"boolean", controlname:"jqxFilesMore_PreserveLastAccessOnSource", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_PreserveLastAccessOnSource);
var reg_jqxFilesMore_IgnoreGlobalSpeedLimit = {fieldname:"FilesMore_IgnoreGlobalSpeedLimit", type:"boolean", controlname:"jqxFilesMore_IgnoreGlobalSpeedLimit", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_IgnoreGlobalSpeedLimit);
var reg_jqxFilesMore_DontAddAnyFiles = {fieldname:"FilesMore_DontAddAnyFiles", type:"boolean", controlname:"jqxFilesMore_DontAddAnyFiles", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_DontAddAnyFiles);
var reg_jqxFilesMore_SkipIfFileSizeChanging = {fieldname:"FilesMore_SkipIfFileSizeChanging", type:"boolean", controlname:"jqxFilesMore_SkipIfFileSizeChanging", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_SkipIfFileSizeChanging);
var reg_jqxFilesMore_CreateLinksInsteadOfCopying = {fieldname:"FilesMore_CreateLinksInsteadOfCopying", type:"boolean", controlname:"jqxFilesMore_CreateLinksInsteadOfCopying", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFilesMore_CreateLinksInsteadOfCopying);

// Tabsheet Folders
var reg_jqxFolders_CreateEmptyFolders = {fieldname:"Folders_CreateEmptyFolders", type:"boolean", controlname:"jqxFolders_CreateEmptyFolders", controltype:"jqxCheckBox", default: true};
GProfileEditorRegistryList.push(reg_jqxFolders_CreateEmptyFolders);
var reg_jqxFolders_RemoveEmptiedFolders =  {fieldname:"Folders_RemoveEmptiedFolders", type:"boolean", controlname:"jqxFolders_RemoveEmptiedFolders", controltype:"jqxCheckBox", default:false};
GProfileEditorRegistryList.push(reg_jqxFolders_RemoveEmptiedFolders);

function EnableDisableFolders()
{
  if (GetCheckBoxValue("jqxFolders_OnRightSideCreateFolderEachTime"))
  {
     EnableCheckBox("jqxFolders_IncludeTimeOfDay" ); 
  }
  else
  {
      DisableCheckBox("jqxFolders_IncludeTimeOfDay"); 
  }

  if (GetCheckBoxValue("jqxFolders_FlatRightSide"))
  {
     EnableCheckBox("jqxFolders_CopyLatestFileIfExists"); 
     EnableCheckBox("jqxFolders_FlatRightAddTimestampsForDupes");
  }
  else
  {
      DisableCheckBox("jqxFolders_CopyLatestFileIfExists"); 
      DisableCheckBox("jqxFolders_FlatRightAddTimestampsForDupes");
  }
  
};

   var reg_jqxFolders_OnRightSideCreateFolderEachTime = {fieldname:"Folders_OnRightSideCreateFolderEachTime", type:"boolean", controlname:"jqxFolders_OnRightSideCreateFolderEachTime", controltype:"jqxCheckBox", default:false,
           OnChange : function(){ EnableDisableFolders();} };
   GProfileEditorRegistryList.push(reg_jqxFolders_OnRightSideCreateFolderEachTime);

   var reg_jqxFolders_IncludeTimeOfDay = {fieldname:"Folders_IncludeTimeOfDay", type:"boolean", controlname:"jqxFolders_IncludeTimeOfDay", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxFolders_IncludeTimeOfDay);

   GProfileEditorRegistryList.push({fieldname:"Folders_FlatRightSide", type:"boolean", controlname:"jqxFolders_FlatRightSide", controltype:"jqxCheckBox", default:false,
              OnChange : function(){ EnableDisableFolders();} });
   GProfileEditorRegistryList.push({fieldname:"Folders_CopyLatestFileIfExists", type:"boolean", controlname:"jqxFolders_CopyLatestFileIfExists", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Folders_FlatRightAddTimestampsForDupes", type:"boolean", controlname:"jqxFolders_FlatRightAddTimestampsForDupes", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Folders_EnsureFolderTimestamps", type:"boolean", controlname:"jqxFolders_EnsureFolderTimestamps", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Folders_UseIntermediateLocation", type:"boolean", controlname:"jqxFolders_UseIntermediateLocation", controltype:"jqxCheckBox", default:false});

   var reg_jqxDontDeleteFolders = {fieldname:"DontDeleteFolders", type:"boolean", controlname:"jqxDontDeleteFolders", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxDontDeleteFolders);

   var reg_jqxTouchLeftParents = {fieldname:"TouchLeftParents", type:"boolean", controlname:"cbTouchLeftParents", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxTouchLeftParents);

   var reg_jqxTouchRightParents = {fieldname:"TouchRightParents", type:"boolean", controlname:"cbTouchRightParents", controltype:"jqxCheckBox", default:false};
   GProfileEditorRegistryList.push(reg_jqxTouchRightParents);

   GProfileEditorRegistryList.push({fieldname:"Folders_ScanAllDestinationFoldersToFindMovedFiles", type:"boolean", controlname:"jqxFolders_ScanAllDestinationFoldersToFindMovedFiles", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Folders_CreateFolderSymlinksOnly", type:"boolean", controlname:"jqxFolders_CreateFolderSymlinksOnly", controltype:"jqxCheckBox", default:false});

   // Tabsheet Job

   var bInsideOfShowExecuteBeforeAfterDlg = false;
   function InsideOfShowExecuteBeforeAfterDlgClose()
   {
       bInsideOfShowExecuteBeforeAfterDlg = false;
       if (GProfileEditorFormOpen)
          EnableCheckBox("jqxJob_ExecuteCommand", true);
   }        
   function ShowExecuteBeforeAfterDlg()
   {
       if (GIsmobileApplication) return;
       if (bInsideOfShowExecuteBeforeAfterDlg == true) return;
       bInsideOfShowExecuteBeforeAfterDlg = true;
       EnableCheckBox("jqxJob_ExecuteCommand", false);
       $("#HTML_ExecuteBeforeAfterDlg_div").html( HTML_ExecuteBeforeAfterDlg );   
       $('#jqxExecuteBeforeAfterDlg').jqxWindow({ maxWidth: 750,  width: 750, maxHeight:600, height:600, autoOpen: false, isModal: true,  
          theme: 'energyblue', animationType: 'slide' });
       $("#inptJob_ExecuteBefore").jqxInput({ width : 400, height : 25  });                  
       $("#inptJob_ExecuteBefore").jqxInput('val', GJob_ExecuteBefore);              
  
       $("#inptJob_ExecuteAfter").jqxInput({ width : 400, height : 25  });                  
       $("#inptJob_ExecuteAfter").jqxInput('val', GJob_ExecuteAfter);              
  


        $('#JobExecuteBeforeAfter_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
        $('#JobExecuteBeforeAfter_OK_btn').click(function () {
          GJob_ExecuteBefore = $("#inptJob_ExecuteBefore").jqxInput('val');               
          GJob_ExecuteAfter = $("#inptJob_ExecuteAfter").jqxInput('val');    
          SetCheckBoxValue("jqxJob_ExecuteCommand", (GJob_ExecuteBefore != "" ) || (GJob_ExecuteAfter != "") );          
          $('#jqxExecuteBeforeAfterDlg').jqxWindow('close');
        });                

        $('#JobExecuteBeforeAfter_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
        $('#JobExecuteBeforeAfter_Cancel_btn').click(function () {
        
          $('#jqxExecuteBeforeAfterDlg').jqxWindow('close');
        });



        $('#jqxExecuteBeforeAfterDlg').jqxWindow('open'); 
        $('#jqxExecuteBeforeAfterDlg').on('close', function(event){
           setTimeout(InsideOfShowExecuteBeforeAfterDlgClose, 2000);  
        });
   };
   GProfileEditorRegistryList.push({fieldname:"Job_ExecuteCommand", type:"boolean", controlname:"jqxJob_ExecuteCommand", controltype:"jqxCheckBox", default:false,

   OnChange: function( event )
    {  
        if (bInsideOfShowExecuteBeforeAfterDlg == true) return;
        if (HTML_ExecuteBeforeAfterDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/ExecuteBeforeAfterDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_ExecuteBeforeAfterDlg = client.responseText;
                     if (HTML_ExecuteBeforeAfterDlg != "" )
                     {
                       $("#HTML_ExecuteBeforeAfterDlg_div").html( HTML_ExecuteBeforeAfterDlg );
                       setTimeout(ShowExecuteBeforeAfterDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            ShowExecuteBeforeAfterDlg();
    }});      
    
    
    var GJob_NoEmail = false;
    var GJob_EmailAlways = false;
    var GJob_NoLogFileAttach = false;
    var GJob_EmailDontAttachFile = false;
    var GJob_EmailOnlyWhenError = false;
    var GJob_EmailIfNothing = false;
    var GJob_NoDriveMissingEmail = false;
    var GJob_EmailFilesOverride = 'cbGrayed'; 
    var GJob_AddRecipients = false;
    var GJob_OverrideRecipients = "";
 
 var bInsideOfShowEmailSettingsDlg = false;   
function InsideOfShowEmailSettingsDlgClose()
{
   bInsideOfShowEmailSettingsDlg = false;
   if (GProfileEditorFormOpen)
      EnableCheckBox("jqxJob_OverrideEmailSettings", true);
}

 function ShowEmailSettingsDlg()
 {
    if (GIsmobileApplication) return;
    if (bInsideOfShowEmailSettingsDlg == true) return;
    bInsideOfShowEmailSettingsDlg = true;
    EnableCheckBox("jqxJob_OverrideEmailSettings", false);
    $('#jqxJob_EmailSettingsDlg').jqxWindow({ maxWidth: 500,  width: 500, maxHeight:550, height:550, autoOpen: false, isModal: true,  
    theme: 'energyblue', animationType: 'slide' });
    CreateCheckBox("jqxJob_NoEmailCb");
    SetCheckBoxValue("jqxJob_NoEmailCb", GJob_NoEmail);
    CreateCheckBox("jqxJob_EmailAlwaysCb");
    SetCheckBoxValue("jqxJob_EmailAlwaysCb", GJob_EmailAlways);
    CreateCheckBox("jqxJob_NoLogFileAttachCb");
    SetCheckBoxValue("jqxJob_NoLogFileAttachCb", GJob_NoLogFileAttach);
    CreateCheckBox("jqxJob_EmailDontAttachFileCb");
    SetCheckBoxValue("jqxJob_EmailDontAttachFileCb", GJob_EmailDontAttachFile);
    CreateCheckBox("jqxJob_EmailOnlyWhenErrorCb");
    SetCheckBoxValue("jqxJob_EmailOnlyWhenErrorCb", GJob_EmailOnlyWhenError);
    CreateCheckBox("jqxJob_EmailIfNothingCb");
    SetCheckBoxValue("jqxJob_EmailIfNothingCb", GJob_EmailIfNothing);
    CreateCheckBox("jqxJob_NoDriveMissingEmailCb");
    SetCheckBoxValue("jqxJob_NoDriveMissingEmailCb", GJob_NoDriveMissingEmail);

    $("#jqxJob_EmailFilesOverrideCb").jqxCheckBox({hasThreeStates:true});
    
    if (GJob_EmailFilesOverride == 'cbGrayed' )
      $("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked', null )
    else if (GJob_EmailFilesOverride == 'cbChecked' )
      $("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked', true )
    else if (GJob_EmailFilesOverride == 'cbUnchecked' )
      $("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked', false )


    CreateCheckBox("jqxJob_AddRecipientsCb");
    SetCheckBoxValue("jqxJob_AddRecipientsCb", GJob_AddRecipients);
        
    $("#inptOverrideRecipientsMemo").jqxTextArea({width: 300, height: 150});
    $("#inptOverrideRecipientsMemo").jqxTextArea('val', GJob_OverrideRecipients);        




    $('#Job_EmailSettings_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Job_EmailSettings_btn').click(function () {
      GJob_NoEmail = GetCheckBoxValue("jqxJob_NoEmailCb");
      GJob_EmailAlways = GetCheckBoxValue("jqxJob_EmailAlwaysCb");
      GJob_NoLogFileAttach = GetCheckBoxValue("jqxJob_NoLogFileAttachCb");
      GJob_EmailDontAttachFile = GetCheckBoxValue("jqxJob_EmailDontAttachFileCb");
      GJob_EmailOnlyWhenError = GetCheckBoxValue("jqxJob_EmailOnlyWhenErrorCb");
      GJob_EmailIfNothing = GetCheckBoxValue("jqxJob_EmailIfNothingCb");
      GJob_NoDriveMissingEmail = GetCheckBoxValue("jqxJob_NoDriveMissingEmailCb");
      

      if ($("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked' ) == null )
        GJob_EmailFilesOverride = 'cbGrayed';
      else if ($("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked' ) == true)
        GJob_EmailFilesOverride = 'cbChecked';
      else if ($("#jqxJob_EmailFilesOverrideCb").jqxCheckBox('checked' ) == false )
        GJob_EmailFilesOverride = 'cbUnchecked';
        


      GJob_AddRecipients = GetCheckBoxValue("jqxJob_AddRecipientsCb");
      GJob_OverrideRecipients = $("#inptOverrideRecipientsMemo").jqxTextArea('val');        

      SetCheckBoxValue("jqxJob_OverrideEmailSettings", GJob_NoEmail || GJob_EmailAlways || GJob_NoLogFileAttach
        || GJob_EmailDontAttachFile || GJob_EmailOnlyWhenError || GJob_EmailIfNothing || GJob_NoDriveMissingEmail ||
        ( GJob_EmailFilesOverride != 'cbGrayed')|| GJob_AddRecipients || ( GJob_OverrideRecipients != "" ) );      
      $('#jqxJob_EmailSettingsDlg').jqxWindow('close');
    });                

    $('#Job_EmailSettings_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Job_EmailSettings_Cancel_btn').click(function () {
    
      $('#jqxJob_EmailSettingsDlg').jqxWindow('close');
    });

    $('#jqxJob_EmailSettingsDlg').jqxWindow('open');  
    $('#jqxJob_EmailSettingsDlg').on('close', function(event){
        setTimeout(InsideOfShowEmailSettingsDlgClose, 2000);        
    });
    
 }



   GProfileEditorRegistryList.push({fieldname:"Job_OverrideEmailSettings", type:"boolean", controlname:"jqxJob_OverrideEmailSettings", controltype:"jqxCheckBox", default:false,

    OnChange: function( event )
    {
        if (bInsideOfShowEmailSettingsDlg == true) return;
        if (HTML_Job_EmailSettingsDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/Job_EmailSettingsDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_Job_EmailSettingsDlg = client.responseText;
                     $("#HTML_Job_EmailSettingsDlg_div").html( HTML_Job_EmailSettingsDlg );
                     setTimeout(ShowEmailSettingsDlg, 100);
                   }
                }
                client.send();                 
         }
         else
            ShowEmailSettingsDlg();
    },

    OnInitCheckboxState : function()
    {
        return GJob_NoEmail || GJob_EmailAlways || GJob_NoLogFileAttach
               || GJob_EmailDontAttachFile || GJob_EmailOnlyWhenError || GJob_EmailIfNothing || GJob_NoDriveMissingEmail ||
             ( GJob_EmailFilesOverride != 'cbGrayed')|| GJob_AddRecipients || ( GJob_OverrideRecipients != "" );      

    }

  });            




var bInsideOfShowHTML_RunAsUserDlg = false;

function InsideOfShowHTML_RunAsUserDlgClose()
{
   // make sure it's really checked correctly
   var needcheck=GJob_RunAsUser !='';

   if (GetCheckBoxValue('jqxJob_RunAsUser')!=needcheck)
   {
      bInsideOfShowHTML_RunAsUserDlg = true;
      SetCheckBoxValue('jqxJob_RunAsUser', needcheck);
      setTimeout(InsideOfShowHTML_RunAsUserDlgClose, 1000);
      return;
   }

   bInsideOfShowHTML_RunAsUserDlg = false;
   EnableCheckBox('jqxJob_RunAsUser', true);
}


function ShowHTML_RunAsUserDlg()
{
  if (GIsmobileApplication || bInsideOfShowHTML_RunAsUserDlg)
     return;

  bInsideOfShowHTML_RunAsUserDlg = true;
  EnableCheckBox('jqxJob_RunAsUser', false);
  $('#jqxRunAsUserDlg').jqxWindow({ maxWidth: 600,  width: 600, maxHeight:300, height:300, autoOpen: false, isModal: true,  
    theme: 'energyblue', animationType: 'slide' });

  $("#inptJob_RunAsUser").jqxInput({ width : 300, height : 25  });                  
  $("#inptJob_RunAsUser").jqxInput('val', GJob_RunAsUser);              
    
  $("#inptJob_RunAsDomain").jqxInput({ width : 300, height : 25  });                  
  $("#inptJob_RunAsDomain").jqxInput('val', GJob_RunAsDomain);              
  
  $("#inptJob_RunAsPassword").jqxPasswordInput({ width : 300, height : 25  });                  
  $("#inptJob_RunAsPassword").jqxPasswordInput('val', GJob_RunAsPassword);
                

    $('#JobRunAsUser_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#JobRunAsUser_OK_btn').click(function () {
      GJob_RunAsUser = $("#inptJob_RunAsUser").jqxInput('val');               
      GJob_RunAsDomain = $("#inptJob_RunAsDomain").jqxInput('val');    
      GJob_RunAsPassword = $("#inptJob_RunAsPassword").jqxPasswordInput('val');              
      SetCheckBoxValue('jqxJob_RunAsUser', GJob_RunAsUser !='');  
      $('#jqxRunAsUserDlg').jqxWindow('close');
    });                

    $('#JobRunAsUser_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#JobRunAsUser_Cancel_btn').click(function () {
    
      $('#jqxRunAsUserDlg').jqxWindow('close');
    });

  $('#jqxRunAsUserDlg').jqxWindow('open'); 
  $('#jqxRunAsUserDlg').on('close',
      function(event)
      {
         setTimeout(InsideOfShowHTML_RunAsUserDlgClose, 2000);
      });
};

   GProfileEditorRegistryList.push({fieldname:"Job_DoRunAsUser", type:"boolean", controlname:"jqxJob_RunAsUser", controltype:"jqxCheckBox", default:false,

    OnChange: function( event )
    {  
        if (bInsideOfShowHTML_RunAsUserDlg)
           return;

        if (HTML_RunAsUserDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/RunAsUserDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_RunAsUserDlg = client.responseText;
                     if (HTML_RunAsUserDlg != "" )
                     {
                        $("#HTML_RunAsUserDlg_div").html( HTML_RunAsUserDlg );
                        setTimeout(ShowHTML_RunAsUserDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            ShowHTML_RunAsUserDlg();
    }});            
   
 var HTML_Job_NetworkConnectionsDlg = "";
 var GJob_MakeConnection1 = false;
 var GJob_MakeConnection2 = false;
 var GJobNetworkPath1 = "";
 var GJobNetworkPath2 = "";
 var GJobNetworkUsername1 = "";
 var GJobNetworkUsername2 = "";
 var GJobNetworkPassword1 = "";
 var GJobNetworkPassword2 = "";

 var GJobReconnect1 = false;
 var GJobReconnect2 = false;
 var GJobDisconnect1 = false;
 var GJobDisconnect2 = false;

 var bInsideOfShow_Job_NetworkConnectionsDlg = false;
 function InsideOfShow_Job_NetworkConnectionsDlgClose()
 {
     bInsideOfShow_Job_NetworkConnectionsDlg = false;
     if (GProfileEditorFormOpen)
        EnableCheckBox("jqxJob_NetworkConnections", true);
 }

 function Show_Job_NetworkConnectionsDlg()
 {
    if (GIsmobileApplication) return;
    if (bInsideOfShow_Job_NetworkConnectionsDlg == true) return;
    bInsideOfShow_Job_NetworkConnectionsDlg = true;
    EnableCheckBox("jqxJob_NetworkConnections", false);
    $('#jqxJob_NetworkConnectionsDlg').jqxWindow({ maxWidth: 700,  width: 700, maxHeight:400, height:400, autoOpen: false, isModal: true,  
    theme: 'energyblue', animationType: 'slide' });
    CreateCheckBox("jqxJobMakeConnection1Cb");
    SetCheckBoxValue("jqxJobMakeConnection1Cb", GJob_MakeConnection1);
    CreateCheckBox("jqxJobMakeConnection2Cb");
    SetCheckBoxValue("jqxJobMakeConnection2Cb", GJob_MakeConnection2);
    CreateCheckBox("jqxJobReconnect1Cb");
    SetCheckBoxValue("jqxJobReconnect1Cb", GJobReconnect1);
    CreateCheckBox("jqxJobReconnect2Cb");
    SetCheckBoxValue("jqxJobReconnect2Cb", GJobReconnect2 );
    CreateCheckBox("jqxJobDisconnect1Cb");
    SetCheckBoxValue("jqxJobDisconnect1Cb", GJobDisconnect1);
    CreateCheckBox("jqxJobDisconnect2Cb");
    SetCheckBoxValue("jqxJobDisconnect2Cb", GJobDisconnect2);
        
    $("#inptJobNetworkPath1").jqxInput({ width : 150, height : 25  }); 
    $("#inptJobNetworkPath1").jqxInput( 'val', GJobNetworkPath1 );                      
    $("#inptJobNetworkPath2").jqxInput({ width : 150, height : 25  });                  
    $("#inptJobNetworkPath2").jqxInput( 'val', GJobNetworkPath2 ); 

    $("#inptJobNetworkUsername1").jqxInput({ width : 150, height : 25  });                  
    $("#inptJobNetworkUsername1").jqxInput( 'val', GJobNetworkUsername1 );
    $("#inptJobNetworkUsername2").jqxInput({ width : 150, height : 25  });                  
    $("#inptJobNetworkUsername2").jqxInput( 'val', GJobNetworkUsername2 );


    $("#inptJobNetworkPassword1").jqxPasswordInput({ width : 138, height : 25  });                  
    $("#inptJobNetworkPassword1").jqxPasswordInput( 'val', GJobNetworkPassword1 );
    $("#inptJobNetworkPassword2").jqxPasswordInput({ width : 138, height : 25  });                  
    $("#inptJobNetworkPassword2").jqxPasswordInput( 'val', GJobNetworkPassword2 );
    
  


    $('#Job_NetworkConnections_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Job_NetworkConnections_OK_btn').click(function () {
      GJob_MakeConnection1 = GetCheckBoxValue("jqxJobMakeConnection1Cb");
      GJob_MakeConnection2 = GetCheckBoxValue("jqxJobMakeConnection2Cb");
      GJobReconnect1 = GetCheckBoxValue("jqxJobReconnect1Cb");
      GJobReconnect2 = GetCheckBoxValue("jqxJobReconnect2Cb");
      GJobDisconnect1 = GetCheckBoxValue("jqxJobDisconnect1Cb");
      GJobDisconnect2 = GetCheckBoxValue("jqxJobDisconnect2Cb");
      GJobNetworkPath1 = $("#inptJobNetworkPath1").jqxInput( 'val' );
      GJobNetworkPath2 = $("#inptJobNetworkPath2").jqxInput( 'val' );
      GJobNetworkUsername1 = $("#inptJobNetworkUsername1").jqxInput( 'val' );
      GJobNetworkUsername2 = $("#inptJobNetworkUsername2").jqxInput( 'val' );
      GJobNetworkPassword1 = $("#inptJobNetworkPassword1").jqxPasswordInput( 'val' );
      GJobNetworkPassword2 = $("#inptJobNetworkPassword2").jqxPasswordInput( 'val' );
      SetCheckBoxValue("jqxJob_NetworkConnections", GJob_MakeConnection1 || GJob_MakeConnection2 );
    
      $('#jqxJob_NetworkConnectionsDlg').jqxWindow('close');
    });                

    $('#Job_NetworkConnections_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Job_NetworkConnections_Cancel_btn').click(function () {
    
      $('#jqxJob_NetworkConnectionsDlg').jqxWindow('close');
    });

 
    $('#jqxJob_NetworkConnectionsDlg').jqxWindow('open'); 
    $('#jqxJob_NetworkConnectionsDlg').on('close', function(event){
       setTimeout(InsideOfShow_Job_NetworkConnectionsDlgClose, 2000);
    });
 }

   GProfileEditorRegistryList.push({fieldname:"Job_NetworkConnections", type:"boolean", controlname:"jqxJob_NetworkConnections", controltype:"jqxCheckBox", default:false,

    OnChange: function( event )
    {  
        if (bInsideOfShow_Job_NetworkConnectionsDlg == true) return;
        if (HTML_Job_NetworkConnectionsDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/Job_NetworkConnectionsDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_Job_NetworkConnectionsDlg = client.responseText;
                     if (HTML_Job_NetworkConnectionsDlg != "" )
                     {
                        $("#HTML_Job_NetworkConnectionsDlg_div").html( HTML_Job_NetworkConnectionsDlg );
                        setTimeout(Show_Job_NetworkConnectionsDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            Show_Job_NetworkConnectionsDlg();
    }});            

  
  var HTML_Job_ExternalCopyToolDlg = "";
  var HTML_Job_ExternalCopyToolConfigDlg = "";

  function  Show_Job_ExternalCopyToolConfigDlg()
  {
     if (GIsmobileApplication) return;
     $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow({ maxWidth: 800,  width: 800, maxHeight:400, height:400, autoOpen: false, isModal: true,  
     theme: 'energyblue', animationType: 'slide' });

                     


     $('#jqxJob_ExternalCopyToolConfigDlg').jqxWindow('open'); 
  }

  function  Show_Job_ExternalCopyToolDlg()
  {
     if (GIsmobileApplication) return;
     $('#jqxJob_ExternalCopyToolDlg').jqxWindow({ maxWidth: 700,  width: 700, maxHeight:300, height:300, autoOpen: false, isModal: true,  
     theme: 'energyblue', animationType: 'slide' });


     $('#Job_ExternalCopyTool_Add_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
     $('#Job_ExternalCopyTool_Add_btn').click(function () {

        if (HTML_Job_ExternalCopyToolConfigDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/Job_ExternalCopyToolConfigDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_Job_ExternalCopyToolConfigDlg = client.responseText;
                     if (HTML_Job_ExternalCopyToolConfigDlg != "" )
                     {
                        $("#HTML_Job_ExternalCopyToolConfigDlg_div").html( HTML_Job_ExternalCopyToolConfigDlg );
                        setTimeout(Show_Job_ExternalCopyToolConfigDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            Show_Job_ExternalCopyToolConfigDlg();   
                      
    });                


     $('#jqxJob_ExternalCopyToolDlg').jqxWindow('open'); 
  }
  GProfileEditorRegistryList.push({fieldname:"Job_UseExternalCopyingTool", type:"boolean", controlname:"jqxJob_UseExternalCopyingTool", controltype:"jqxCheckBox", default:false,

  OnChange: function( event )
  {  
        if (HTML_Job_ExternalCopyToolDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/Job_ExternalCopyToolDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_Job_ExternalCopyToolDlg = client.responseText;
                     if (HTML_Job_ExternalCopyToolDlg != "" )
                     {
                        $("#HTML_Job_ExternalCopyToolDlg_div").html( HTML_Job_ExternalCopyToolDlg );
                        setTimeout(Show_Job_ExternalCopyToolDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            Show_Job_ExternalCopyToolDlg();
  }}); 

   GProfileEditorRegistryList.push({fieldname:"Job_RunOnlyIfNeitherSideEmpty", type:"boolean", controlname:"jqxJob_RunOnlyIfNeitherSideEmpty", controltype:"jqxCheckBox", default:false});


   GProfileEditorRegistryList.push({fieldname:"Job_ShowCheckboxesInPreview", type:"boolean", controlname:"jqxJob_ShowCheckboxesInPreview", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Job_CheckFreeSpaceBeforeCopying", type:"boolean", controlname:"jqxJob_CheckFreeSpaceBeforeCopying", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"Job_IgnoreInternetConnectivityCheck", type:"boolean", controlname:"jqxJob_IgnoreInternetConnectivityCheck", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Job_WhenRunViaScheduler", type:"boolean", controlname:"jqxJob_WhenRunViaScheduler", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Job_WhenRunManuallyUnattended", type:"boolean", controlname:"jqxJob_WhenRunManuallyUnattended", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"Job_WhenRunManuallyAttended", type:"boolean", controlname:"jqxJob_WhenRunManuallyAttended", controltype:"jqxCheckBox", default:false});
        // Tabsheet  Safety
   GProfileEditorRegistryList.push({fieldname:"Safety_WarnIfMovingFiles", type:"boolean", controlname:"jqxSafety_WarnIfMovingFiles", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"Safety_WarnBeforeOverridingReadOnly", type:"boolean", controlname:"jqxSafety_WarnBeforeOverridingReadOnly", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"Safety_WarnBeforeOverridingLarger", type:"boolean", controlname:"jqxSafety_WarnBeforeOverridingLarger", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"Safety_WarnBeforeOverridingNewer", type:"boolean", controlname:"jqxSafety_WarnBeforeOverridingNewer", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"Safety_WarnBeforeDeleting", type:"boolean", controlname:"jqxSafety_WarnBeforeDeleting", controltype:"jqxCheckBox", default: true});
       // Tabsheet Safety Special

function EnableDisableSafety()
{
  if (GIsmobileApplication) return;
  if (GetCheckBoxValue("jqxSafetySpecial_WarnIfDeletingFilesMoreThan") == true )
  {
     $("#inptSafetySpecial_WarnIfDeletingFilesMoreThan").jqxFormattedInput( 'disabled', false ); 
  }
  else
  {
      $("#inptSafetySpecial_WarnIfDeletingFilesMoreThan").jqxFormattedInput( 'disabled', true ); 
  }
  if (GetCheckBoxValue("jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder") == true )
  {
     $("#inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").jqxFormattedInput( 'disabled', false ); 
  }
  else
  {
    $("#inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder").jqxFormattedInput( 'disabled', true ); 
  }

}

   GProfileEditorRegistryList.push({fieldname:"SafetySpecial_WarnIfDeletingFilesMoreThan", type:"boolean", controlname:"jqxSafetySpecial_WarnIfDeletingFilesMoreThan", controltype:"jqxCheckBox", default: true,
     OnChange : function(){ EnableDisableSafety();} }); 
   GProfileEditorRegistryList.push({fieldname:"SafetySpecial_WarnIfDeletingAllFilesInAnySubfolder", type:"boolean", controlname:"jqxSafetySpecial_WarnIfDeletingAllFilesInAnySubfolder", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"SafetySpecial_WarnIfDeletingMoreThanInAnySubfolder", type:"boolean", controlname:"jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder", controltype:"jqxCheckBox", default: true,
     OnChange : function(){ EnableDisableSafety();} }); 
    // Tabsheet Safety Unattended Mode
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_OverwriteReadOnly", type:"boolean", controlname:"jqxSafetyUnattended_OverwriteReadOnly", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_OverwriteLarge", type:"boolean", controlname:"jqxSafetyUnattended_OverwriteLarge", controltype:"jqxCheckBox", default: true});
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_NewerFilesCanBeOverwritten", type:"boolean", controlname:"jqxSafetyUnattended_NewerFilesCanBeOverwritten", controltype:"jqxCheckBox", default:false});
  
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_EnableSpecialSafetyCheck", type:"boolean", controlname:"jqxSafetyUnattended_EnableSpecialSafetyCheck", controltype:"jqxCheckBox", default:false });

   // Tabsheet Special

var HTML_Special_SecurityAndSharesDlg = "";
var GSpecial_CopyOwnerSetting = false;
var GSpecial_CopyGroupSetting = false;
var GSpecial_CopyPermissions = false;
var GSpecial_ProcessBaseFolder = false;
var GCompareOwner = false;
var GCompareGroup = false;
var GComparePermissions = false;
var GBreakInheritance = true;
var GCopyInheritedAsExplicitIfNecessary = false;
var GUpdateFolderSecurity = true;
var GTranslateSIDs = false;
var GTargetDomain = '';
var GUsePermissionFilesLeft = false;
var GUsePermissionFilesRight = false;
var GPutPermissionsIntoCompressedFiles = true;
var GApplyPermissionsToCompressedFiles = false;
var GAssumeUnreadableDifferent = false;
var GStripUnknownSIDs = false;

var GCompareACLs = false;
var GLinuxOwnerMode = 0;
var GSetToOwner = "";
var GSetToGroup = "";
var GLinuxPermissionMode = 0;
var GSetPermissions = "";


var GCopyShares = false;
var GCompareSharePaths = false;
var GCompareSharePermissions = false;
var GShareSelectedFoldersOnly = false;
var GShareTranslatePaths = false;

var bInsideOfShow_Special_SecurityAndSharesDlg = false;

function InsideOfShow_Special_SecurityAndSharesDlgClose()
{
    bInsideOfShow_Special_SecurityAndSharesDlg = false;
    if (GisSyncoveryWindows && GProfileEditorFormOpen)
       EnableCheckBox('jqxSpecialSpFeatr_ProcessSecurityCb', true);
}

function Show_Special_SecurityAndSharesDlg()
{
    if (GIsmobileApplication)
       return;

    if (bInsideOfShow_Special_SecurityAndSharesDlg)
       return;

    bInsideOfShow_Special_SecurityAndSharesDlg = true;

    if (GisSyncoveryWindows)
       EnableCheckBox('jqxSpecialSpFeatr_ProcessSecurityCb', false);

    var DlgHeight=GisSyncoveryWindows ? 850 : 650;

    $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow({ maxWidth: 900,  width: 900, maxHeight:DlgHeight, height:DlgHeight, autoOpen: false, isModal: true,
     theme: 'energyblue', animationType: 'slide' });

    $('#SecurityAndSharesTabs').jqxTabs({ width: 850, height: DlgHeight-100});

    CreateCheckBoxWithValue("cbCompareOwner", GCompareOwner);
    CreateCheckBoxWithValue("cbCompareGroup", GCompareGroup);
    CreateCheckBoxWithValue("cbComparePermissions", GComparePermissions);

    if (GisSyncoveryWindows)
    {
      CreateCheckBoxWithValue("jqxSpecial_CopyOwnerSetting", GSpecial_CopyOwnerSetting );
      CreateCheckBoxWithValue("jqxSpecial_CopyGroupSetting", GSpecial_CopyGroupSetting );
      CreateCheckBoxWithValue("jqxSpecial_CopyPermissions", GSpecial_CopyPermissions );

      CreateCheckBoxWithValue("cbBreakInheritance", GBreakInheritance);
      CreateCheckBoxWithValue("cbCopyInheritedAsExplicitIfNecessary", GCopyInheritedAsExplicitIfNecessary);
      CreateCheckBoxWithValue("cbUpdateFolderSecurity", GUpdateFolderSecurity);
      CreateCheckBoxWithValue("cbTranslateSIDs", GTranslateSIDs);
    }
    else
    {
      CreateCheckBoxWithValue("cbCompareACLs", GCompareACLs);

      var LinuxOwnerModeComboSource =['Inherit Owner/Group from Destination Parent','Copy Owner/Group from Source', 'Use Process Owner (could be root)', 'Specify Owner and Group:']

      $("#jqxLinuxOwnerMode").jqxDropDownList( { source: LinuxOwnerModeComboSource, width: 300, height: 25, autoDropDownHeight: true} );
      $("#jqxLinuxOwnerMode").on('change', EnableDisableMorePermissionsDlg);
      $("#jqxLinuxOwnerMode").jqxDropDownList( { selectedIndex: GLinuxOwnerMode });


      var LinuxPermissionModeComboSource =['Inherit Permissions from Destination Parent','Copy Permissions from Source',
                                           'Owner Only (rw- --- ---)','Allow Group Read (rw- r-- ---)','Allow All Read (rw- r-- r--)',
                                           'Allow Group Read/Write (rw- rw- ---)','Allow All Read/Write (rw- rw- rw-)',
                                           'Specify Permissions:','Use Default Permissions (could be empty)'];

      $("#jqxLinuxPermissionMode").jqxDropDownList( { source: LinuxPermissionModeComboSource, width: 300, height: 25, autoDropDownHeight: true} );
      $("#jqxLinuxPermissionMode").on('change', EnableDisableMorePermissionsDlg);
      $("#jqxLinuxPermissionMode").jqxDropDownList( { selectedIndex: GLinuxPermissionMode });

      $("#inptOwner").jqxInput({ width : 100, height : 25   });
      $("#inptOwner").jqxInput('val', GSetToOwner);

      $("#inptGroup").jqxInput({ width : 100, height : 25   });
      $("#inptGroup").jqxInput('val', GSetToGroup);

      $("#inptPerms").jqxInput({ width : 100, height : 25   });
      $("#inptPerms").jqxInput('val', GSetPermissions);

      EnableDisableMorePermissionsDlg();
    }
    CreateCheckBoxWithValue("jqxSpecial_ProcessBaseFolder", GSpecial_ProcessBaseFolder );

    CreateCheckBoxWithValue("cbUsePermissionFilesLeft", GUsePermissionFilesLeft);
    CreateCheckBoxWithValue("cbUsePermissionFilesRight", GUsePermissionFilesRight);
    CreateCheckBoxWithValue("cbPutPermissionsIntoCompressedFiles", GPutPermissionsIntoCompressedFiles);
    CreateCheckBoxWithValue("cbApplyPermissionsToCompressedFiles", GApplyPermissionsToCompressedFiles);

    if (GisSyncoveryWindows)
    {
      CreateCheckBoxWithValue("cbAssumeUnreadableDifferent", GAssumeUnreadableDifferent);
      CreateCheckBoxWithValue("cbStripUnknownSIDs", GStripUnknownSIDs);

      CreateCheckBoxWithValue("cbCopyShares", GCopyShares);
      CreateCheckBoxWithValue("cbCompareSharePaths", GCompareSharePaths);
      CreateCheckBoxWithValue("cbCompareSharePermissions", GCompareSharePermissions);
      CreateCheckBoxWithValue("cbShareSelectedFoldersOnly", GShareSelectedFoldersOnly);
      CreateCheckBoxWithValue("cbShareTranslatePaths", GShareTranslatePaths);

      $("#edTargetDomain").jqxInput({ width : 300, height : 25   });
      $("#edTargetDomain").jqxInput('val', GTargetDomain);
    }

    $('#Special_SecurityAndShares_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Special_SecurityAndShares_OK_btn').click(function ()
    {
      GCompareOwner = GetCheckBoxValue("cbCompareOwner");
      GCompareGroup = GetCheckBoxValue("cbCompareGroup");
      GComparePermissions = GetCheckBoxValue("cbComparePermissions");

      if (GisSyncoveryWindows)
      {
         GSpecial_CopyOwnerSetting = GetCheckBoxValue("jqxSpecial_CopyOwnerSetting");
         GSpecial_CopyGroupSetting = GetCheckBoxValue("jqxSpecial_CopyGroupSetting");
         GSpecial_CopyPermissions = GetCheckBoxValue("jqxSpecial_CopyPermissions");

         GBreakInheritance = GetCheckBoxValue("cbBreakInheritance");
         GCopyInheritedAsExplicitIfNecessary = GetCheckBoxValue("cbCopyInheritedAsExplicitIfNecessary");
         GUpdateFolderSecurity = GetCheckBoxValue("cbUpdateFolderSecurity");
         GTranslateSIDs = GetCheckBoxValue("cbTranslateSIDs");

         GTargetDomain = $("#edTargetDomain").jqxInput('val');

      }
      else
      {
         GCompareACLs = GetCheckBoxValue("cbCompareACLs");

         GLinuxOwnerMode = $("#jqxLinuxOwnerMode").jqxDropDownList('getSelectedIndex');
         GSetToOwner = $("#inptOwner").jqxInput('val');
         GSetToGroup = $("#inptGroup").jqxInput('val');
         GLinuxPermissionMode = $("#jqxLinuxPermissionMode").jqxDropDownList('getSelectedIndex');
         GSetPermissions = $("#inptPerms").jqxInput('val');
      }
      GSpecial_ProcessBaseFolder = GetCheckBoxValue("jqxSpecial_ProcessBaseFolder");

      GUsePermissionFilesLeft = GetCheckBoxValue("cbUsePermissionFilesLeft");
      GUsePermissionFilesRight = GetCheckBoxValue("cbUsePermissionFilesRight");
      GPutPermissionsIntoCompressedFiles = GetCheckBoxValue("cbPutPermissionsIntoCompressedFiles");
      GApplyPermissionsToCompressedFiles = GetCheckBoxValue("cbApplyPermissionsToCompressedFiles");

      if (GisSyncoveryWindows)
      {
        GAssumeUnreadableDifferent = GetCheckBoxValue("cbAssumeUnreadableDifferent");
        GStripUnknownSIDs = GetCheckBoxValue("cbStripUnknownSIDs");

        GCopyShares = GetCheckBoxValue("cbCopyShares");
        GCompareSharePaths = GetCheckBoxValue("cbCompareSharePaths");
        GCompareSharePermissions = GetCheckBoxValue("cbCompareSharePermissions");
        GShareSelectedFoldersOnly = GetCheckBoxValue("cbShareSelectedFoldersOnly");
        GShareTranslatePaths = GetCheckBoxValue("cbShareTranslatePaths");

        SetCheckBoxValue('jqxSpecialSpFeatr_ProcessSecurityCb', GSpecial_CopyOwnerSetting || GSpecial_CopyGroupSetting || GSpecial_CopyPermissions || GCopyShares);
      }
      $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('close');
    });                

    $('#Special_SecurityAndShares_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Special_SecurityAndShares_Cancel_btn').click(function () {
      
        $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('close');
    });
                  
    $('#jqxSpecial_SecurityAndSharesDlg').jqxWindow('open'); 
    $('#jqxSpecial_SecurityAndSharesDlg').on('close', function(event){
       setTimeout(InsideOfShow_Special_SecurityAndSharesDlgClose, 2000);  
    });
}

function DoShow_Special_SecurityAndSharesDlg()
{
   if (bInsideOfShow_Special_SecurityAndSharesDlg)
      return;

   if (HTML_Special_SecurityAndSharesDlg == "")
   {
       var client = new XMLHttpRequest();
       if (GisSyncoveryWindows)
          client.open('GET', '/Special_SecurityAndSharesDlg.html');
       else
          client.open('GET', '/MorePermissionsDlg.html');
       client.onreadystatechange = function()
           {
              if (client.readyState == XMLHttpRequest.DONE)
              {
                HTML_Special_SecurityAndSharesDlg = client.responseText;
                if (HTML_Special_SecurityAndSharesDlg != "" )
                {
                   $("#HTML_Special_SecurityAndSharesDlg_div").html( HTML_Special_SecurityAndSharesDlg );
                   setTimeout(Show_Special_SecurityAndSharesDlg, 100);
                }
              }
           }
           client.send();
    }
    else
       Show_Special_SecurityAndSharesDlg();
}

 GProfileEditorRegistryList.push({fieldname:"ProcessSecurityAndShares", type:"boolean", controlname:"jqxSpecialSpFeatr_ProcessSecurityCb", controltype:"jqxCheckBox", default:false,
    OnChange: DoShow_Special_SecurityAndSharesDlg});


 function EnableDisableSpecial()
 {
    if (GIsmobileApplication)
       return;

    var usepartial=GetCheckBoxValue('jqxSpecialSpFeatr_UsePartialFileUpdatingCb');

    EnableCheckBox('jqxSpecialSpFeatr_RightSideRemoteServiceCb', usepartial );
    EnableCheckBox('jqxSpecialSpFeatr_FastModeCb', usepartial );

    $("#rbBlockLevelChecksums").jqxRadioButton( 'disabled', !usepartial );
    $("#rbBlockLevelFileSystemMonitoring").jqxRadioButton( 'disabled', !usepartial || !GIsSyncoveryWindows);

    var useblocklevelremserv=usepartial && GetCheckBoxValue('jqxSpecialSpFeatr_RightSideRemoteServiceCb');

    EnableCheckBox('jqxSpecial_DontFallBackFromPartialCb', useblocklevelremserv );
    EnableCheckBox('jqxSpecial_PartialRemoteOneByOneCb', useblocklevelremserv );

    var useremlisting=GetCheckBoxValue('jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb') ||
                      GetCheckBoxValue('jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb');

    EnableCheckBox('jqxSpecialSpFeatr_UseDifferentFoldersCb', useremlisting );
    $("#btnCommunicationPaths").jqxButton({disabled: !useremlisting || !GetCheckBoxValue('jqxSpecialSpFeatr_UseDifferentFoldersCb')});

}

   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_UsePartialFileUpdating", type:"boolean", controlname:"jqxSpecialSpFeatr_UsePartialFileUpdatingCb", controltype:"jqxCheckBox", default:false,
      OnChange : function() {EnableDisableSpecial();}});

   var reg_BlockLevelRadiogroupWidget = {fieldname:"BlockLevelRadiogroupWidget", type:"string", controlname:"BlockLevelRadiogroupWidget",
                                         controltype:"ButtonGroup", default: "BlockLevelChecksums",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#rbBlockLevelChecksums"), $("#rbBlockLevelFileSystemMonitoring"), null, null, null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked( option,  $("#rbBlockLevelChecksums"), $("#rbBlockLevelFileSystemMonitoring"), null, null, null, null );

   }};
   GProfileEditorRegistryList.push(reg_BlockLevelRadiogroupWidget);

   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_RightSideRemoteService", type:"boolean", controlname:"jqxSpecialSpFeatr_RightSideRemoteServiceCb", controltype:"jqxCheckBox", default:false,
      OnChange : function() {EnableDisableSpecial();}}); 
   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_FastMode", type:"boolean", controlname:"jqxSpecialSpFeatr_FastModeCb", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_LeftSideUsesRemoteService", type:"boolean", controlname:"jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb", controltype:"jqxCheckBox", default:false,
      OnChange : function() {EnableDisableSpecial();}}); 
   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_RightSideUsesRemoteService", type:"boolean", controlname:"jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb", controltype:"jqxCheckBox", default:false,
      OnChange : function() {EnableDisableSpecial();}}); 


  function Special_PathsForCommunicationDlg()
   {
      if (GIsmobileApplication) return;
      $("#jqxPathsForCommunicationDlg").jqxWindow({ maxWidth: 350,  width: 350, maxHeight:280, height:280, autoOpen: false, isModal: true,  
              theme: 'energyblue', animationType: 'slide' });
      
       $("#inptCommPathForLeftSide").jqxInput({width: '200', height: '25px'}); 
       $("#inptCommPathForLeftSide").jqxInput('val', GCommPathForLeftSide);
       $("#inptLocalPath1").jqxInput({width: '200', height: '25px'}); 
       $("#inptLocalPath1").jqxInput('val', GCommLocalPath1);
       $("#inptCommPathForRightSide").jqxInput({width: '200', height: '25px'}); 
       $("#inptCommPathForRightSide").jqxInput('val', GCommPathForRightSide);
       $("#inptLocalPath2").jqxInput({width: '200', height: '25px'}); 
       $("#inptLocalPath2").jqxInput('val', GCommLocalPath2);
       
       

      $("#PathsForCommunication_OK_btn").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $("#PathsForCommunication_OK_btn").click(function ()
      {
		 GCommPathForLeftSide = $("#inptCommPathForLeftSide").jqxInput('val');
		 GCommLocalPath1 = $("#inptLocalPath1").jqxInput('val');
		 GCommPathForRightSide = $("#inptCommPathForRightSide").jqxInput('val');
		 GCommLocalPath2 = $("#inptLocalPath2").jqxInput('val');
  
         $("#jqxPathsForCommunicationDlg").jqxWindow('close');
      });                

      $("#PathsForCommunication_Cancel_btn").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $("#PathsForCommunication_Cancel_btn").click(function () {
      
        $("#jqxPathsForCommunicationDlg").jqxWindow('close');
      });

      $("#jqxPathsForCommunicationDlg").jqxWindow('open');   
   }

   GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_UseDifferentFolders", type:"boolean", controlname:"jqxSpecialSpFeatr_UseDifferentFoldersCb", controltype:"jqxCheckBox", default:false,
                                    OnChange : function() {EnableDisableSpecial();}});
    
   GProfileEditorRegistryList.push({fieldname:"Special_CommPathForLeftSide", type:"string", controlname:"GCommPathForLeftSide", controltype:"variable", value: "", default: ""});
   GProfileEditorRegistryList.push({fieldname:"Special_CommLocalPath1", type:"string", controlname:"GCommLocalPath1", controltype:"variable", value: "", default: ""});
   GProfileEditorRegistryList.push({fieldname:"Special_CommPathForRightSide", type:"string", controlname:"GCommPathForRightSide", controltype:"variable", value: "", default: ""});
   GProfileEditorRegistryList.push({fieldname:"Special_CommLocalPath2", type:"string", controlname:"GCommLocalPath2", controltype:"variable", value: "", default: ""});

   GProfileEditorRegistryList.push({fieldname:"RedownloadServerModifiedUploads", type:"boolean", controlname:"cbRedownloadServerModifiedUploads", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"DoubleCheckTimestamps", type:"boolean", controlname:"cbDoubleCheckTimestamps", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"DetectChangedFilesViaMonitoring", type:"boolean", controlname:"cbDetectChangedFilesViaMonitoring", controltype:"jqxCheckBox", default:false});

   GProfileEditorRegistryList.push({fieldname:"cbSpawnSeparateSubJobs", type:"boolean", controlname:"cbSpawnSeparateSubJobs", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"inptSpawnSeparateSubJobs", type:"decimal", controlname:"inptSpawnSeparateSubJobs", controltype:"jqxFormattedInput", spinButtons: true, default: "0"});

   // Tabsheet Special->Database
   GProfileEditorRegistryList.push({fieldname:"SpDb_OpenDatabaseReadOnly", type:"boolean", controlname:"jqxSpDb_OpenDatabaseReadOnlyCb", controltype:"jqxCheckBox", default:false});
   GProfileEditorRegistryList.push({fieldname:"SpecialDatabase_FastMode", type:"boolean", controlname:"jqxSpecialDatabase_FastModeCb", controltype:"jqxCheckBox", default:false});

//ProfileEditor form
var reg_inptProfileName={fieldname:"Name", type:"string", controlname:"inptProfileName", controltype:"jqxInput", default: "",  width: 600, height: 25};
   GProfileEditorRegistryList.push(reg_inptProfileName);

   GProfileEditorRegistryList.push({fieldname:"LeftPath", type:"string", controlname:"GLeftStoredPath", controltype:"variable", value: "", default: ""});
   GProfileEditorRegistryList.push({fieldname:"RightPath", type:"string", controlname:"GRightStoredPath", controltype:"variable", value: "", default: ""});

var reg_RunEveryDay={fieldname:"Run_Every_Day_Time_Input", type:"time", controlname:"jqxRun_Every_Day_Time_Input", controltype:"jqxDateTimeInput",   width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
   GProfileEditorRegistryList.push(reg_RunEveryDay);
   
// Tabsheet Schedule/Schedule
var reg_inptScheduleDays={fieldname:"ScheduleDays", type:"decimal", controlname:"inptScheduleDays", controltype:"jqxNumberInput", spinButtons:  true, default: "0", value: 0, width: 30, height: 25};
   GProfileEditorRegistryList.push(reg_inptScheduleDays);
var reg_inptScheduleHours={fieldname:"ScheduleHours", type:"decimal", controlname:"inptScheduleHours", controltype:"jqxNumberInput", spinButtons:  true, default: "0", value: 0, width: 30, height: 25};
   GProfileEditorRegistryList.push(reg_inptScheduleHours);
var reg_inptScheduleMinutes={fieldname:"ScheduleMinutes", type:"decimal", controlname:"inptScheduleMinutes", controltype:"jqxNumberInput", spinButtons:  true, default: "0", value: 0, width: 30, height: 25};
   GProfileEditorRegistryList.push(reg_inptScheduleMinutes);
var reg_inptScheduleSeconds={fieldname:"ScheduleSec", type:"decimal", controlname:"inptScheduleSec", controltype:"jqxNumberInput", spinButtons:  true, default: "0", value: 0, width: 30, height: 25};
   GProfileEditorRegistryList.push(reg_inptScheduleSeconds);
   
// Tabsheet Schedule/More
var reg_jqxAddRandomDelay_Time_Input = { fieldname:"AddRandomDelay_Time_Input", type:"decimal", controlname:"jqxAddRandomDelay_Time_Input", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"};
   GProfileEditorRegistryList.push(reg_jqxAddRandomDelay_Time_Input); 
var reg_jqxWarnIfProfileNotRunFor_Time_Input = {fieldname:"WarnIfProfileNotRunFor_Time_Input", type:"number", controlname:"jqxWarnIfProfileNotRunFor_Time_Input", controltype:"jqxFormattedInput", spinButtons:  true, default: "0" };
   GProfileEditorRegistryList.push(reg_jqxWarnIfProfileNotRunFor_Time_Input); 
// Tabsheet AccessAndRetries/Wait and Retry
var reg_inptWRWaitUpToMin = {fieldname:"WRWaitUpToMin", type:"decimal", controlname:"inptWRWaitUpToMin", controltype:"jqxFormattedInput", spinButtons:  true, default: "1"};
   GProfileEditorRegistryList.push(reg_inptWRWaitUpToMin);
                     
// Tabsheet Comparison Comparison
   var reg_inptComparIgnoreSec = {fieldname:"ComparIgnoreSec", type:"decimal", controlname:"inptComparIgnoreSec", controltype:"jqxFormattedInput", spinButtons: true, default: "2" };
   GProfileEditorRegistryList.push(reg_inptComparIgnoreSec); 
  var reg_inptComparIgnoreHours = {fieldname:"ComparIgnoreHours", type:"decimal", controlname:"inptComparIgnoreHours", controltype:"jqxFormattedInput", spinButtons: true, default: "1" };
   GProfileEditorRegistryList.push(reg_inptComparIgnoreHours);  

 // Tabsheet Files
 var reg_inptFilesNumberToCopyInparallel = {fieldname:"FilesNumberToCopyInparallel", type:"decimal", controlname:"inptFilesNumberToCopyInparallel", controltype:"jqxFormattedInput", spinButtons:  true, default: "3"};
   GProfileEditorRegistryList.push(reg_inptFilesNumberToCopyInparallel);
 var reg_inptFilesSplitLargeFiles = {fieldname:"FilesSplitLargeFiles", type:"string", controlname:"inptFilesSplitLargeFiles", controltype:"jqxInput", default: "0", width: 80};
   GProfileEditorRegistryList.push(reg_inptFilesSplitLargeFiles);

// Tabsheet Files More
 var reg_inptFilesMore_SpeedLimit =  {fieldname:"FilesMore_SpeedLimit", type:"float", controlname:"inptFilesMore_SpeedLimit", controltype:"jqxNumberInput", default: "1", decimalDigits:3, width: 50, height: 25};
   GProfileEditorRegistryList.push(reg_inptFilesMore_SpeedLimit);

var AGeneralSpeeLim = 0;

   var bInsideOfSpeedLimitAdvancedDlg = false;
   function InsideOfSpeedLimitAdvancedDlgClose()
   {
      bInsideOfSpeedLimitAdvancedDlg = false;
      if (GProfileEditorFormOpen)
         EnableCheckBox('jqxSpeedLimitAdvancedCb', true);
   }

  function ShowSpeedLimitAdvancedDlg()
  {
     if (GIsmobileApplication) return;
     if (bInsideOfSpeedLimitAdvancedDlg == true) return;
     bInsideOfSpeedLimitAdvancedDlg = true;
     EnableCheckBox('jqxSpeedLimitAdvancedCb', false);
     $('#jqxAdvancedSpeedLimitDlg').jqxWindow({ maxWidth: 400,  width: 400, maxHeight:400, height:400, autoOpen: false, isModal: true,
                   theme: 'energyblue', animationType: 'slide' });
     AGeneralSpeeLim = $('#inptFilesMore_SpeedLimit').jqxNumberInput('val');
     CreateCheckBox('cbGeneralLimit');
     $('#cbGeneralLimit').val(GetCheckBoxValue('jqxFilesMore_SpeedLimit'));
     $('#edGeneralLimit').jqxNumberInput({inputMode: 'simple', decimalDigits: 3, width: 50, decimalSeparator: GDecimalSeparator, groupSeparator: GThousandSeparator});
     $('#edGeneralLimit').jqxNumberInput('val', AGeneralSpeeLim);

     function EnableDisableSpeedLimitAdvancedDlg()
     {
        var grEnabled = GetCheckBoxValue('cbAdvancedSpeedLimit');
        $("#grdAlternativeLimits").jqxGrid('disabled', !grEnabled);
     }

     CreateCheckBox('cbAdvancedSpeedLimit', null, null, EnableDisableSpeedLimitAdvancedDlg);
     $('#cbAdvancedSpeedLimit').val(GSpeedLimitAdvanced);
     if (GAdvSpeedLimitData.length==0)
        GAdvSpeedLimitData =
           [{ "days" : "Monday", "from" : "8:00:00", "to" : "18:00:00", "mbsec" : AGeneralSpeeLim},
            { "days" : "Tuesday", "from" : "8:00:00", "to" : "18:00:00", "mbsec" : AGeneralSpeeLim},
            { "days" : "Wednesday", "from" : "8:00:00", "to" : "18:00:00", "mbsec" : AGeneralSpeeLim},
            { "days" : "Thursday", "from" : "8:00:00", "to" : "18:00:00", "mbsec" : AGeneralSpeeLim},
            { "days" : "Friday", "from" : "8:00:00", "to" : "23:59:59", "mbsec" : AGeneralSpeeLim},
            { "days" : "Saturday", "from" : "0:00:00", "to" : "23:59:59", "mbsec" : AGeneralSpeeLim},
            { "days" : "Sunday", "from" : "0:00:00", "to" : "23:59:59", "mbsec" : AGeneralSpeeLim}
            ];
      // prepare the data
      var source =
      {
          datatype: "json",
          datafields: [
              { name: 'days', map: 'days' },
              { name: 'from', map: 'from', type : 'time', format : GLongTimeFormat },
              { name: 'to', map: 'to', type : 'time', format : GLongTimeFormat },
              { name: 'mbsec', map: 'mbsec', type: 'float' }
              
          ],
          updaterow: function (rowid, rowdata, commit) {
              GAdvSpeedLimitData[rowdata.boundindex].from = rowdata.from;
              GAdvSpeedLimitData[rowdata.boundindex].to = rowdata.to;
              GAdvSpeedLimitData[rowdata.boundindex].mbsec = rowdata.mbsec;
              commit(true); 
                   
              //alert('boundindex : ' + rowdata.boundindex + 'mbsec: ' +rowdata.mbsec);

              
           },
          localdata: GAdvSpeedLimitData
      };
     var dataAdapter = new $.jqx.dataAdapter(source);

     var localizationobj = {decimalseparator: GDecimalSeparator, thousandsseparator: GThousandSeparator};

     $("#grdAlternativeLimits").jqxGrid(
       {
                    width: '100%',                     
                    //height: '100%',  
                               
                    rowsheight : 25,                                       
                    source: dataAdapter,
                    pageable: false,
                    pagesize:7,
                    autoheight: true,
                    virtualmode: false,
                    rowdetails: false,   
                    showtoolbar: false,
                    showstatusbar: false,
                    showaggregates: false,
                    selectionmode: 'singlecell',
                    editable: true,
                    localization: localizationobj,
                    
                    
                    // pagermode: 'simple',
                    //rowsheight: 34,
                    //scrollmode: 'deferred',
                    //sortable: true,
                    //altrows: true,
                    //enabletooltips: true,
                    //editable: false,
                    //selectionmode: 'singlerow',
                    //showtoolbar: true,
                    
                columns: [
                  { text: '', datafield: 'days', width: '25%' },
                  { text: 'From', datafield: 'from',  width: '25%', cellsformat: GLongTimeFormat},
                  { text: 'To', datafield: 'to', width: '25%', cellsformat: GLongTimeFormat},
                  { text: 'MB/sec', datafield: 'mbsec', width: '25%' }, // cellsformat: 'f'?
                ]
            });

     $("#AdvancedSpeedLimit_OK_btn").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
     $("#AdvancedSpeedLimit_OK_btn").click(function ()
     {
        $('#jqxFilesMore_SpeedLimit').val(GetCheckBoxValue('cbGeneralLimit'));
        $('#inptFilesMore_SpeedLimit').jqxNumberInput('val', $('#edGeneralLimit').jqxNumberInput('val'));
        GSpeedLimitAdvanced = GetCheckBoxValue('cbAdvancedSpeedLimit');
        $('#jqxSpeedLimitAdvancedCb').val(GSpeedLimitAdvanced);

        $("#jqxAdvancedSpeedLimitDlg").jqxWindow('close');
     });                

     $('#jqxAdvancedSpeedLimitDlg').on('close', function (event)
     {
        setTimeout(InsideOfSpeedLimitAdvancedDlgClose, 2000);
     });

     $('#jqxAdvancedSpeedLimitDlg').jqxWindow('open'); 
     EnableDisableSpeedLimitAdvancedDlg()
  };

 var HTML_FileMore_SpeedLimitAdvancedDlg = ""; 

 var reg_jqxSpeedLimitAdvancedCb = {fieldname:"FilesMore_SpeedLimitAdvancedCb", type:"boolean", controlname:"jqxSpeedLimitAdvancedCb", controltype:"jqxCheckBox", default:false,
    OnChange : function(event){

        if (HTML_FileMore_SpeedLimitAdvancedDlg == "")
        {
            var client = new XMLHttpRequest();  
            client.open('GET', '/AdvancedSpeedLimitDlg.html');
                client.onreadystatechange = function() 
                {                              
                   if (client.readyState == XMLHttpRequest.DONE)
                   {
                     HTML_FileMore_SpeedLimitAdvancedDlg = client.responseText;
                     if (HTML_FileMore_SpeedLimitAdvancedDlg != "" )
                     {
                        $("#HTML_FileMore_SpeedLimitAdvancedDlg_div").html( HTML_FileMore_SpeedLimitAdvancedDlg );
                        setTimeout(ShowSpeedLimitAdvancedDlg, 100);
                     }
                   }
                }
                client.send();                 
         }
         else
            ShowSpeedLimitAdvancedDlg();
       
    }    
 };
 GProfileEditorRegistryList.push(reg_jqxSpeedLimitAdvancedCb);


 var reg_jqxFilesMore_CopyOnlyFilesPerRun = {fieldname:"FilesMore_CopyOnlyFilesPerRun", type:"boolean", controlname:"jqxFilesMore_CopyOnlyFilesPerRun", controltype:"jqxCheckBox", default:false,
    OnChange : EnableDisableFiles
 };
   GProfileEditorRegistryList.push(reg_jqxFilesMore_CopyOnlyFilesPerRun);
 var reg_inptFilesMore_FilesPerRun = {fieldname:"FilesMore_FilesPerRun", type:"decimal", controlname:"inptFilesMore_FilesPerRun", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"};
   GProfileEditorRegistryList.push(reg_inptFilesMore_FilesPerRun);
          
 var reg_jqxFilesMore_CopyOnlyMBPerRun = {fieldname:"FilesMore_CopyOnlyMBPerRun", type:"boolean", controlname:"jqxFilesMore_CopyOnlyMBPerRun", controltype:"jqxCheckBox", default:false,
    OnChange : EnableDisableFiles
 };
   GProfileEditorRegistryList.push(reg_jqxFilesMore_CopyOnlyMBPerRun);
 var reg_inptFilesMore_MBPerRun = {fieldname:"FilesMore_MBPerRun", type:"decimal", controlname:"inptFilesMore_MBPerRun", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"};
   GProfileEditorRegistryList.push(reg_inptFilesMore_MBPerRun);

// Tabsheet Safety Special
   GProfileEditorRegistryList.push({fieldname:"SafetySpecial_WarnIfDeletingFilesMoreThanVal", type:"decimal", controlname:"inptSafetySpecial_WarnIfDeletingFilesMoreThan", controltype:"jqxFormattedInput", spinButtons:  true, default: 10});
   GProfileEditorRegistryList.push({fieldname:"SafetySpecial_WarnIfDeletingMoreThanInAnySubfolderVal", type:"decimal", controlname:"inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder", controltype:"jqxFormattedInput", spinButtons:  true, default: 40});
          
 // Tabsheet Safety Unattended Mode
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_FileDeletionAllowed", type:"decimal", controlname:"inptSafetyUnattended_FileDeletionAllowed", controltype:"jqxFormattedInput", spinButtons: true, width:80, default: 20, maxvalue: 100});
   GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_DeleteMaxFiles", type:"decimal", controlname:"inptSafetyUnattended_DeleteMaxFiles", controltype:"jqxFormattedInput", spinButtons: true, width:80, default: 1000, maxvalue: 100000000});

 // Tabsheet Vesioning Versioning
   GProfileEditorRegistryList.push({fieldname:"VersVers_KeepOlderVersionsWhenReplacing", type:"boolean", controlname:"jqxVersVers_KeepOlderVersionsWhenReplacing", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersVers_PerFile", type:"decimal", controlname:"inptVersVers_PerFile", controltype:"jqxFormattedInput", spinButtons:  true, default: "2"});

  
 // Tabsheet Special SpecialFeatures

   if (GisSyncoveryWindows)
      GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_SetTargetVolumeLabel", type:"string", controlname:"inptSpecialSpFeatr_SetTargetVolumeLabel", controltype:"jqxInput", default: "", width: 250, height: 25});


   var reg_jqxCopyingOrder = {fieldname:"CopyingOrder", type:"number", controlname:"jqxCopyingOrder",
       controltype:"jqxDropDownList", default: "0",
       width: 250, height: 25, ComboSource :['Standard (Alphanumerical)','Copy Smallest First','Copy Largest First','Copy Oldest First','Copy Newest First']};
   GProfileEditorRegistryList.push(reg_jqxCopyingOrder);

   GProfileEditorRegistryList.push({fieldname:"UseRemServToCopyFiles", type:"boolean", controlname:"cbUseRemServToCopyFiles", controltype:"jqxCheckBox", default: false});

  // Tabsheet Special Database
   GProfileEditorRegistryList.push({fieldname:"SpecialDatabase_DatabaseNameToUse", type:"string", controlname:"inptSpecialDatabase_DatabaseNameToUse", controltype:"jqxInput", default: "", width: 300, height: 25});
   GProfileEditorRegistryList.push({fieldname:"SpecialDatabase_Left", type:"string", controlname:"inptSpecialDatabase_Left", controltype:"jqxInput", default: "",  width: 600, height: 25});
   GProfileEditorRegistryList.push({fieldname:"SpecialDatabase_Right", type:"string", controlname:"inptSpecialDatabase_Right", controltype:"jqxInput", default: "",  width: 600, height: 25});


var reg_IncludeSubfolders={fieldname:"IncludeSubfoldersWidget", type:"string", controlname:"IncludeSubfoldersWidget", controltype:"ButtonGroup", default: "AllMode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#NoneMode"), $("#AllMode"), $("#SelectedMode"), null, null, null );

   }, setfunc: function( option )
   {
       SetRadioGroupChecked(option, $("#NoneMode"), $("#AllMode"), $("#SelectedMode"), null, null, null );
   }};
   GProfileEditorRegistryList.push(reg_IncludeSubfolders);



var reg_OperationMode={fieldname:"SyncOperationModeWidget", type:"string", controlname:"SyncOperationModeWidget", controltype:"ButtonGroup", default: "Standard_Copying_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null );

   }, setfunc: function( option )
   {
       SetRadioGroupChecked(option, $("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null );
   }};
   GProfileEditorRegistryList.push(reg_OperationMode);


    // Tabsheet Schedule/Schedule
      
var reg_RunModeRadioGroup={fieldname:"RunModeRadiogroupWidget", type:"string", controlname:"RunModeRadiogroupWidget", controltype:"ButtonGroup", default: "Run_only_Once_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Run_Every_Day_Radio_Mode"), $("#Repeat_after_Radio_Mode"), $("#Repeat_monthly_Radio_Mode"), $("#Run_only_Once_Radio_Mode"), null, null );

   }, setfunc: function( option )
   {
       SetRadioGroupChecked(option,  $("#Run_Every_Day_Radio_Mode"), $("#Repeat_after_Radio_Mode"), $("#Repeat_monthly_Radio_Mode"), $("#Run_only_Once_Radio_Mode"), null, null );
   }};
   GProfileEditorRegistryList.push(reg_RunModeRadioGroup);

            
   // Tabsheet AccessAndRetries/File Access
   if (GisSyncoveryWindows)
   {
      var reg_VolumeShadowingRadiogroupWidget = {fieldname:"VolumeShadowingRadiogroupWidget", type:"string", controlname:"VolumeShadowingRadiogroupWidget", controltype:"ButtonGroup", default: "Use_to_copy_locked_files_Radio_Mode",
      getfunc: function()
      {
         return GetCheckedRadiobuttonName( $("#Do_not_Use_Radio_Mode"), $("#Use_to_copy_locked_files_Radio_Mode"), $("#Use_for_all_files_Radio_Mode"), $("#Use_for_all_Create_Radio_Mode"), null, null );

      }, setfunc: function( option )
      {
          SetRadioGroupChecked( option,  $("#Do_not_Use_Radio_Mode"), $("#Use_to_copy_locked_files_Radio_Mode"), $("#Use_for_all_files_Radio_Mode"), $("#Use_for_all_Create_Radio_Mode"), null, null );
      }};
      GProfileEditorRegistryList.push(reg_VolumeShadowingRadiogroupWidget);
   }

// Tabsheet AccessAndRetries/Wait and Retry
   var reg_WRReRunRadiogroupWidget = {fieldname:"WRReRunRadiogroupWidget", type:"string", controlname:"WRReRunRadiogroupWidget", controltype:"ButtonGroup", default: "Re_Run_Once_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Re_Run_Once_Radio_Mode"), $("#Re_Run_Until_Success_Radio_Mode"), $("#Max_Re_Runs_Radio_Mode"), null, null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked( option,  $("#Re_Run_Once_Radio_Mode"), $("#Re_Run_Until_Success_Radio_Mode"), $("#Max_Re_Runs_Radio_Mode"), null, null, null ); 

   }};       
   GProfileEditorRegistryList.push(reg_WRReRunRadiogroupWidget);

   // Tabsheet Comparison Comparison
   var reg_ComparWhenSizeIsDiffentRadiogroupWidget = {fieldname:"ComparWhenSizeIsDiffentRadiogroupWidget", type:"string", controlname:"ComparWhenSizeIsDiffentRadiogroupWidget", controltype:"ButtonGroup", default: "Ask_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Ask_Radio_Mode"), $("#Copy_Left_To_Right_Radio_Mode"), $("#Copy_Right_To_Left_Radio_Mode"), $("#Copy_Larger_Files_Radio_Mode"), $("#SizeDiffCopy"), $("#SizeDiffIgnore"), null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked(option,  $("#Ask_Radio_Mode"), $("#Copy_Left_To_Right_Radio_Mode"), $("#Copy_Right_To_Left_Radio_Mode"), $("#Copy_Larger_Files_Radio_Mode"), $("#SizeDiffCopy"), $("#SizeDiffIgnore"), null, null );
   }};
   GProfileEditorRegistryList.push(reg_ComparWhenSizeIsDiffentRadiogroupWidget);

   // Tabsheet Files
   var reg_FilesDetectMovedFilesRadiogroupWidget = {fieldname:"FilesDetectMovedFilesRadiogroupWidget", type:"string", controlname:"FilesDetectMovedFilesRadiogroupWidget", controltype:"ButtonGroup", default: "Files_Right_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Files_Left_Radio_Mode"), $("#Files_Right_Radio_Mode"), $("#Files_Automatic_Radio_Mode"), null, null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked(option,  $("#Files_Left_Radio_Mode"), $("#Files_Right_Radio_Mode"), $("#Files_Automatic_Radio_Mode"), null, null, null ); 
   }};        
   GProfileEditorRegistryList.push(reg_FilesDetectMovedFilesRadiogroupWidget);

   GProfileEditorRegistryList.push({fieldname:"LeftProtocolName", type:"string", controlname:"GLeftProtocolName", controltype:"variable" });
   GProfileEditorRegistryList.push({fieldname:"RightProtocolName", type:"string", controlname:"GRightProtocolName", controltype:"variable" });

   // Tabsheet Masks
   
   GProfileEditorRegistryList.push({fieldname:"Masks_InclusionMasks", type:"string", controlname:"inptInclusionMasks", controltype:"jqxInput", default: "",  width: 600, height: 150});

   var GMasks_ScanWholeTreeForFolderMasks = false;
   var GMasks_IncludeAllSubfoldersOfMatchingFolders = false;
   var GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides = false;   
   var GMasks_FolderMasks = "";

   var bInsideOfFolderMasksDlg = false;
   function InsideOfFolderMasksDlgClose()
   {
      bInsideOfFolderMasksDlg = false;
      if (GProfileEditorFormOpen)
         EnableCheckBox('jqxMasks_SpecFolderMasksCb', true);
   }
   function FolderMasksDlg()
   {
      if (GIsmobileApplication) return;
      if (bInsideOfFolderMasksDlg == true) return;
        bInsideOfFolderMasksDlg = true;
      EnableCheckBox('jqxMasks_SpecFolderMasksCb', false);  
      $("#HTML_FolderMasksDlg_div").html( HTML_FolderMasksDlg );   
      $('#jqxMask_FolderMaskDlg').jqxWindow({ maxWidth: 600,  width: 600, maxHeight:290, height:290, autoOpen: false, isModal: true,  
              theme: 'energyblue', animationType: 'slide',  closeButtonAction: 'close' });

        $('#jqxMask_FolderMaskDlg').on('close', function (event) { 
          
             $('#jqxProfileEditorForm').jqxWindow('focus');
             setTimeout(InsideOfFolderMasksDlgClose, 2000);
          }); 

      $("#jqxMasks_FolderMasksInput").jqxInput({width: '100', height: '25px'});
      $("#jqxMasks_FolderMasksInput").jqxInput('val',GMasks_FolderMasks);
     
      CreateCheckBox("jqxMasks_ScanWholeTreeForFolderMasks"); 
      SetCheckBoxValue("jqxMasks_ScanWholeTreeForFolderMasks", GMasks_ScanWholeTreeForFolderMasks);
      CreateCheckBox("jqxIncludeAllSubfoldersOfMatchingFolders");
      SetCheckBoxValue("jqxIncludeAllSubfoldersOfMatchingFolders", GMasks_IncludeAllSubfoldersOfMatchingFolders);
      CreateCheckBox("jqxProcessFoundFoldersOnlyIfExistOnBothSides");
      SetCheckBoxValue("jqxProcessFoundFoldersOnlyIfExistOnBothSides", GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides);
                

      $('#Mask_FolderMask_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $('#Mask_FolderMask_OK_btn').click(function () {
         GMasks_ScanWholeTreeForFolderMasks = GetCheckBoxValue("jqxMasks_ScanWholeTreeForFolderMasks");
         GMasks_IncludeAllSubfoldersOfMatchingFolders = GetCheckBoxValue("jqxIncludeAllSubfoldersOfMatchingFolders");
         GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides = GetCheckBoxValue("jqxProcessFoundFoldersOnlyIfExistOnBothSides");
         GMasks_FolderMasks = $("#jqxMasks_FolderMasksInput").jqxInput('val');

         SetCheckBoxValue('jqxMasks_SpecFolderMasksCb', GMasks_FolderMasks!="");
         $('#jqxMask_FolderMaskDlg').jqxWindow('close');
         $('#jqxProfileEditorForm').jqxWindow('focus');
      });                

      $('#Mask_FolderMask_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $('#Mask_FolderMask_Cancel_btn').click(function () {
      
        $('#jqxMask_FolderMaskDlg').jqxWindow('close');
        $('#jqxProfileEditorForm').jqxWindow('focus');
      });



      $('#jqxMask_FolderMaskDlg').jqxWindow('open');   
      $('#jqxMask_FolderMaskDlg').jqxWindow('focus');
   };

   GProfileEditorRegistryList.push({fieldname:"Masks_SpecFolderMasks", type:"boolean",
      controlname:"jqxMasks_SpecFolderMasksCb", controltype:"jqxCheckBox", default: false,
    OnChange: function( event )
    {  
       if (bInsideOfFolderMasksDlg == true) return;
       try
       {         
           if (GIsmobileApplication) return;
           FolderMasksDlg();          
        }  
        catch(err) 
        {
          alert(err.message + '  :GProfileEditorRegistryList[Masks_SpecFolderMasks]');
        }   
     } 
  });  


   var GMasks_Restrictions = "";
   var GMasksRestrictionsDirection = "";

   var bInsideOfFileMaskRestrictionsDlg = false;
   function InsideOfFileMaskRestrictionsDlgClose()
   {
      bInsideOfFileMaskRestrictionsDlg = false;
      if (GProfileEditorFormOpen)
         EnableCheckBox('jqxMasks_RestrictionsCb', true);
   }
   function FileMaskRestrictionsDlg()
   {
      if (GIsmobileApplication) return;
      if (bInsideOfFileMaskRestrictionsDlg == true) return;
      bInsideOfFileMaskRestrictionsDlg = true;
      EnableCheckBox('jqxMasks_RestrictionsCb', false);
      $("#HTML_FileMaskRestrictionsDlg_div").html( HTML_FileMaskRestrictionsDlg );                      
      $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow({ maxWidth: 600,  width: 600, maxHeight:250, height:250, autoOpen: false, isModal: true,  
              theme: 'energyblue', animationType: 'slide', closeButtonAction: 'close' });      

      $("#jqxMasks_RestrictionsInput").jqxInput({ width: '400', height: '25px' });
      $("#jqxMasks_RestrictionsInput").jqxInput('val',GMasks_Restrictions);

      $("#Masks_RestrictionLTR_Radio_Mode").jqxRadioButton();
      $("#Masks_RestrictionRTL_Radio_Mode").jqxRadioButton();

       SetRadioGroupChecked(GMasksRestrictionsDirection,  $("#Masks_RestrictionLTR_Radio_Mode"), $("#Masks_RestrictionRTL_Radio_Mode"), null, null, null, null ); 

      $('#Mask_FileMaskRestrictions_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $('#Mask_FileMaskRestrictions_OK_btn').click(function () {
          
        GMasks_Restrictions = $("#jqxMasks_RestrictionsInput").jqxInput('val');
        GMasksRestrictionsDirection = GetCheckedRadiobuttonName( $("#Masks_RestrictionLTR_Radio_Mode"), $("#Masks_RestrictionRTL_Radio_Mode"), null, null, null, null );
        
        SetCheckBoxValue('jqxMasks_RestrictionsCb', GMasks_Restrictions != "");
        $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('close');
        $('#jqxProfileEditorForm').jqxWindow('focus');
      });                

      $('#Mask_FileMaskRestrictions_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $('#Mask_FileMaskRestrictions_Cancel_btn').click(function () {
      
        $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('close');
        $('#jqxProfileEditorForm').jqxWindow('focus');
      });

      $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('open');   
      $('#jqxMask_FileMaskRestrictionsDlg').jqxWindow('focus');

      $('#jqxMask_FileMaskRestrictionsDlg').on('close', function (event) {           
           $('#jqxProfileEditorForm').jqxWindow('focus');
           setTimeout(InsideOfFileMaskRestrictionsDlgClose, 2000);
       }); 

   }

   GProfileEditorRegistryList.push({fieldname:"Masks_RestrictionsCb", type:"boolean", controlname:"jqxMasks_RestrictionsCb", controltype:"jqxCheckBox", default: false,
      OnChange: function( event )
    {  
       if (bInsideOfFileMaskRestrictionsDlg == true) return;
       try
       {
                   
          FileMaskRestrictionsDlg();  
       }  
       catch(err) 
       {
          alert(err.message + '  :GProfileEditorRegistryList[Masks_RestrictionsCb]');
       }  
     } 
 }); 

   GProfileEditorRegistryList.push({fieldname:"Masks_IncludeBackupFiles", type:"boolean", controlname:"jqxMasks_IncludeBackupFilesCb", controltype:"jqxCheckBox", default: false});

      
   GProfileEditorRegistryList.push({fieldname:"Masks_ExclusionMasks", type:"string", controlname:"inptExclusionMasks", controltype:"jqxInput", default: "",  width: 600, height: 150 });
   GProfileEditorRegistryList.push({fieldname:"Masks_UseGlobalExclAlso", type:"boolean", controlname:"jqxMasks_UseGlobalExclAlsoCb", controltype:"jqxCheckBox", default:  true });

   
   GProfileEditorRegistryList.push({fieldname:"ExclucionFilesWidget", type:"string", controlname:"ExclucionFilesWidget", controltype:"ButtonGroup", default: "Masks_DontCopy_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Masks_DontCopy_Radio_Mode"), $("#Masks_IgnoreTotaly_Radio_Mode"), null, null, null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked(option,  $("#Masks_DontCopy_Radio_Mode"), $("#Masks_IgnoreTotaly_Radio_Mode"), null, null, null, null ); 

   }});

  GProfileEditorRegistryList.push({fieldname:"Masks_ProcessHiddenFiles", type:"boolean", controlname:"jqxMasks_ProcessHiddenFilesCb", controltype:"jqxCheckBox", default:  true});
  GProfileEditorRegistryList.push({fieldname:"Masks_SearchHiddenFolders", type:"boolean", controlname:"jqxMasks_SearchHiddenFoldersCb", controltype:"jqxCheckBox", default:  true});

function EnableDisableMasksAndFilters() 
{
  if (GIsmobileApplication) return;

  if (GisSyncoveryWindows)
  {
     if (GetCheckBoxValue("jqxMasks_ProcessReparsePointsCb") == true )
     {
        EnableCheckBox("jqxMasks_CopyOtherReparsePointsCb", true );
        if (!GIsTabletApplication)
        {
           var cb_val = GetCheckBoxValue("jqxMasks_FollowJunctionPointsFilesCb");
           $("#jqxMasks_FollowJunctionPointsFilesCb").replaceWith(
              "<div id='jqxMasks_FollowJunctionPointsFilesCb' style='margin-left: 23px; float: left;'>Follow Symbolic Links to Files</div>" );
           CreateCheckBox("jqxMasks_FollowJunctionPointsFilesCb");
           SetCheckBoxValue("jqxMasks_FollowJunctionPointsFilesCb", cb_val);
           cb_val = GetCheckBoxValue("jqxMasks_FollowJunctionPointsFoldersCb");
           $("#jqxMasks_FollowJunctionPointsFoldersCb").replaceWith(
              "<div id='jqxMasks_FollowJunctionPointsFoldersCb' style='margin-left: 23px; float: left;'>Follow Symbolic Links to Folders</div>" );
           CreateCheckBox("jqxMasks_FollowJunctionPointsFoldersCb");
           SetCheckBoxValue("jqxMasks_FollowJunctionPointsFoldersCb", cb_val);
        }

     }
     else
     {
         EnableCheckBox("jqxMasks_CopyOtherReparsePointsCb", false );
         if (!GIsTabletApplication)
         {
           var cb_val = GetCheckBoxValue("jqxMasks_FollowJunctionPointsFilesCb");
           $("#jqxMasks_FollowJunctionPointsFilesCb").replaceWith(
              "<div id='jqxMasks_FollowJunctionPointsFilesCb' style='margin-left: 23px; float: left;'>Treat File Links as Normal Files</div>" );
           CreateCheckBox("jqxMasks_FollowJunctionPointsFilesCb");
           SetCheckBoxValue("jqxMasks_FollowJunctionPointsFilesCb", cb_val);
           cb_val = GetCheckBoxValue("jqxMasks_FollowJunctionPointsFoldersCb");
           $("#jqxMasks_FollowJunctionPointsFoldersCb").replaceWith(
              "<div id='jqxMasks_FollowJunctionPointsFoldersCb' style='margin-left: 23px; float: left;'>Treat Folder Links as Normal Folders</div>" );
           CreateCheckBox("jqxMasks_FollowJunctionPointsFoldersCb");
           SetCheckBoxValue("jqxMasks_FollowJunctionPointsFoldersCb", cb_val);
         }
     }
  }

  if (GetCheckBoxValue("jqxMasks_FileSizesWithinCb") == true )
  {
     $("#jqxInptMasks_FileSizesMin").jqxInput( 'disabled', false );
     $("#jqxInptMasks_FileSizesMax").jqxInput( 'disabled', false );
  }
  else
  {
     $("#jqxInptMasks_FileSizesMin").jqxInput( 'disabled', true );
     $("#jqxInptMasks_FileSizesMax").jqxInput( 'disabled', true );
  }

  if (GetCheckBoxValue("jqxMasks_FileDatesWithinCb") == true )
  {
     $("#jqxInptDateMasks_FileMinDate").jqxDateTimeInput( 'disabled', false );
     $("#jqxInptDateMasks_FileMaxDate").jqxDateTimeInput( 'disabled', false );     
  }
  else
  {
     $("#jqxInptDateMasks_FileMinDate").jqxDateTimeInput( 'disabled', true );
     $("#jqxInptDateMasks_FileMaxDate").jqxDateTimeInput( 'disabled', true );     
  }

  if (GetCheckBoxValue("jqxMasks_FileAgeCb") == true )
  {
     $("#jqxMasks_FileAgeCombo").jqxDropDownList( 'disabled', false );
     $("#inptMasks_FileAgeDays").jqxFormattedInput( 'disabled', false );
     $("#inptMasks_FileAgeHours").jqxFormattedInput( 'disabled', false );
     $("#inptMasks_FileAgeMinutes").jqxFormattedInput( 'disabled', false );  

     $("#Masks_LastModification_Radio_Mode").jqxRadioButton( 'disabled', false );
     $("#Masks_Creation_Radio_Mode").jqxRadioButton( 'disabled', false );
     $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton( 'disabled', false );
     $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton( 'disabled', false );
     $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton( 'disabled', false );                
  }
  else
  {
     $("#jqxMasks_FileAgeCombo").jqxDropDownList( 'disabled', true );
     $("#inptMasks_FileAgeDays").jqxFormattedInput( 'disabled', true );
     $("#inptMasks_FileAgeHours").jqxFormattedInput( 'disabled', true );
     $("#inptMasks_FileAgeMinutes").jqxFormattedInput( 'disabled', true );        

     $("#Masks_LastModification_Radio_Mode").jqxRadioButton( 'disabled', true );
     $("#Masks_Creation_Radio_Mode").jqxRadioButton( 'disabled', true );
     $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton( 'disabled', true );
     $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton( 'disabled', true );
     $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton( 'disabled', true );                
  }
  if (GetCheckBoxValue("jqxMasks_TargetDataRestoreCb") == true )
  {
      $("#jqxInptDateMasks_TargetDateRestoreDate").jqxDateTimeInput( 'disabled', false );
      $("#jqxInptDateMasks_TargetDateRestoreTime").jqxDateTimeInput( 'disabled', false );      
  }
  else
  {
      $("#jqxInptDateMasks_TargetDateRestoreDate").jqxDateTimeInput( 'disabled', true );
      $("#jqxInptDateMasks_TargetDateRestoreTime").jqxDateTimeInput( 'disabled', true );      
  }

};

  GProfileEditorRegistryList.push({fieldname:"Masks_CopyFilesWithArchiveFlag", type:"boolean", controlname:"jqxMasks_CopyFilesWithArchiveFlagCb", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"Masks_ClearArchiveFlags", type:"boolean", controlname:"jqxMasks_ClearArchiveFlagsCb", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"RestoreDeletedItems", type:"boolean", controlname:"cbRestoreDeletedItems", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"SymlinkFilesLeft", type:"boolean", controlname:"cbSymlinkFilesLeft", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"SymlinkFilesRight", type:"boolean", controlname:"cbSymlinkFilesRight", controltype:"jqxCheckBox", default: false});

  GProfileEditorRegistryList.push({fieldname:"SkipOfflineFiles", type:"boolean", controlname:"cbSkipOfflineFiles", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"CopyPinnedFilesOnlyLeft", type:"boolean", controlname:"cbCopyPinnedFilesOnlyLeft", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"CopyPinnedFilesOnlyRight", type:"boolean", controlname:"cbCopyPinnedFilesOnlyRight", controltype:"jqxCheckBox", default: false});

  if (GisSyncoveryWindows)
  {
     GProfileEditorRegistryList.push({fieldname:"Masks_ProcessReparsePoints", type:"boolean", controlname:"jqxMasks_ProcessReparsePointsCb", controltype:"jqxCheckBox", default:  true,
         OnChange : function(){ EnableDisableMasksAndFilters(); } });
     GProfileEditorRegistryList.push({fieldname:"Masks_FollowJunctionPointsFiles", type:"boolean", controlname:"jqxMasks_FollowJunctionPointsFilesCb", controltype:"jqxCheckBox", default:  true});
     GProfileEditorRegistryList.push({fieldname:"Masks_FollowJunctionPointsFolders", type:"boolean", controlname:"jqxMasks_FollowJunctionPointsFoldersCb", controltype:"jqxCheckBox", default: false});
     GProfileEditorRegistryList.push({fieldname:"Masks_CopyOtherReparsePoints", type:"boolean", controlname:"jqxMasks_CopyOtherReparsePointsCb", controltype:"jqxCheckBox", default: false});
  }
  else
  {
   GProfileEditorRegistryList.push({fieldname:"SymLinksFiles", type:"string", controlname:"SymLinksFiles", controltype:"ButtonGroup",
                                    default: "SymLinksFilesCopy",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#SymLinksFilesIgnore"), $("#SymLinksFilesFollow"), $("#SymLinksFilesCopy"), null, null, null );

   }, setfunc: function( option )
   {
        //alert("Setting SymLinksFiles to " + option);
        SetRadioGroupChecked(option,  $("#SymLinksFilesIgnore"), $("#SymLinksFilesFollow"), $("#SymLinksFilesCopy"), null, null, null );

   }});

   GProfileEditorRegistryList.push({fieldname:"SymLinksFolders", type:"string", controlname:"SymLinksFolders", controltype:"ButtonGroup",
                                    default: "SymLinksFoldersCopy",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#SymLinksFoldersIgnore"), $("#SymLinksFoldersFollow"), $("#SymLinksFoldersCopy"), null, null, null );

   }, setfunc: function( option )
   {
        //alert("Setting SymLinksFolders to " + option);
        SetRadioGroupChecked(option,  $("#SymLinksFoldersIgnore"), $("#SymLinksFoldersFollow"), $("#SymLinksFoldersCopy"), null, null, null );

   }});
  }

  GProfileEditorRegistryList.push({fieldname:"Masks_FileSizesWithin", type:"boolean", controlname:"jqxMasks_FileSizesWithinCb", controltype:"jqxCheckBox", default: false,

OnChange : function(){ 

  EnableDisableMasksAndFilters();
}

});            
  GProfileEditorRegistryList.push({fieldname:"Masks_FileSizesMin", type:"string", controlname:"jqxInptMasks_FileSizesMin", controltype:"jqxInput", default: 0,  width: 100, height: 25});
  GProfileEditorRegistryList.push({fieldname:"Masks_FileSizesMax", type:"string", controlname:"jqxInptMasks_FileSizesMax", controltype:"jqxInput", default: 0,  width: 100, height: 25});
  
  GProfileEditorRegistryList.push({fieldname:"Masks_FileDatesWithin", type:"boolean", controlname:"jqxMasks_FileDatesWithinCb", controltype:"jqxCheckBox", default: false,
OnChange : function()
{
  if ($("#jqxMasks_FileDatesWithinCb").jqxCheckBox('val'))
     $("#jqxMasks_FileAgeCb").jqxCheckBox('val',false);
  EnableDisableMasksAndFilters();
}
});

  GProfileEditorRegistryList.push({fieldname:"Masks_FileMinDate", type:"date", controlname:"jqxInptDateMasks_FileMinDate", controltype:"jqxDateTimeInput", width: 110, height: '25px', formatString: GDateFormat, showCalendarButton: true});
  GProfileEditorRegistryList.push({fieldname:"Masks_FileMaxDate", type:"date", controlname:"jqxInptDateMasks_FileMaxDate", controltype:"jqxDateTimeInput", width: 110, height: '25px', formatString: GDateFormat, showCalendarButton: true});

  GProfileEditorRegistryList.push({fieldname:"Masks_FileAgeCb", type:"boolean", controlname:"jqxMasks_FileAgeCb", controltype:"jqxCheckBox", default: false,
OnChange : function()
{
  if ($("#jqxMasks_FileAgeCb").jqxCheckBox('val'))
     $("#jqxMasks_FileDatesWithinCb").jqxCheckBox('val',false);
  EnableDisableMasksAndFilters();
}
});            
     
  GProfileEditorRegistryList.push({fieldname:"Masks_FileAgeComboIndex", type:"number", controlname:"jqxMasks_FileAgeCombo", controltype:"jqxDropDownList", default: "0",
  width: 150, height: 25, ComboSource : [ 'less than', 'over' ]});      
           
  
  GProfileEditorRegistryList.push({fieldname:"Masks_FileAgeDays", type:"number", controlname:"inptMasks_FileAgeDays", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"});
  GProfileEditorRegistryList.push({fieldname:"Masks_FileAgeHours", type:"number", controlname:"inptMasks_FileAgeHours", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"});
  GProfileEditorRegistryList.push({fieldname:"Masks_FileAgeMinutes", type:"number", controlname:"inptMasks_FileAgeMinutes", controltype:"jqxFormattedInput", spinButtons:  true, default: "0"});

   GProfileEditorRegistryList.push({fieldname:"Masks_FilterByWidget", type:"string", controlname:"Masks_FilterByWidget", controltype:"ButtonGroup", default: "Masks_LastModification_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Masks_LastModification_Radio_Mode"), $("#Masks_Creation_Radio_Mode"), null, null, null, null );

   }, setfunc: function( option )
   {
        SetRadioGroupChecked(option,  $("#Masks_LastModification_Radio_Mode"), $("#Masks_Creation_Radio_Mode"), null, null, null, null ); 

   }});


   GProfileEditorRegistryList.push({fieldname:"Masks_ApplyToWidget", type:"string", controlname:"Masks_ApplyToWidget", controltype:"ButtonGroup", default: "Masks_ApplyToFiles_Radio_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#Masks_ApplyToFiles_Radio_Mode"),  $("#Masks_ApplyToFolders_Radio_Mode"), $("#Masks_ApplyToBoth_Radio_Mode"), null, null, null ); 

   }, setfunc: function( option )
   {
        SetRadioGroupChecked(option,   $("#Masks_ApplyToFiles_Radio_Mode"),  $("#Masks_ApplyToFolders_Radio_Mode"), $("#Masks_ApplyToBoth_Radio_Mode"), null, null, null ); 

   }});

  GProfileEditorRegistryList.push({fieldname:"Masks_TargetDataRestore", type:"boolean", controlname:"jqxMasks_TargetDataRestoreCb", controltype:"jqxCheckBox", default: false,
    OnChange : function(){ EnableDisableMasksAndFilters();} });
  GProfileEditorRegistryList.push({fieldname:"Masks_TargetDateRestoreDate", type:"date", controlname:"jqxInptDateMasks_TargetDateRestoreDate", controltype:"jqxDateTimeInput",  width: 110, height: '25px', formatString: GDateFormat, showCalendarButton: true});
  GProfileEditorRegistryList.push({fieldname:"Masks_TargetDateRestoreTime", type:"date", controlname:"jqxInptDateMasks_TargetDateRestoreTime", controltype:"jqxDateTimeInput", width: 110, height: '25px', formatString: GLongTimeFormat, showCalendarButton: false});

  GProfileEditorRegistryList.push({fieldname:"ScanOnlyFoldersModifiedSinceLastRun", type:"boolean", controlname:"cbScanOnlyFoldersModifiedSinceLastRun", controltype:"jqxCheckBox", default: false});

  var reg_jqxWRAvoidRerunDueToLockedCb = {fieldname:"WRAvoidRerunDueToLocked", type:"boolean", controlname:"jqxWRAvoidRerunDueToLockedCb", controltype:"jqxCheckBox", default: false};
  GProfileEditorRegistryList.push(reg_jqxWRAvoidRerunDueToLockedCb);            
 var reg_inptWRMaxReRuns = {fieldname:"WRMaxReRuns", type:"decimal", controlname:"inptWRMaxReRuns", controltype:"jqxFormattedInput", spinButtons:  true,default: "0"};
  GProfileEditorRegistryList.push(reg_inptWRMaxReRuns);
 var reg_inptWRRetryAfter =  {fieldname:"WRRetryAfter", type:"decimal", controlname:"inptWRRetryAfter", controltype:"jqxFormattedInput", spinButtons:  true, default: "30"};
  GProfileEditorRegistryList.push(reg_inptWRRetryAfter);
       
  GProfileEditorRegistryList.push({fieldname:"VersVers_MoveIntoFolderInpt", type:"string", controlname:"inptMoveIntoFolder", controltype:"jqxInput", default: "Older",  width: 300, height: 25});


  GProfileEditorRegistryList.push({fieldname:"VersVers_OnlyOnRightHandSide", type:"boolean", controlname:"jqxVersVers_OnlyOnRightHandSide", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"VersVers_MoveIntoFolder", type:"boolean", controlname:"jqxVersVers_MoveIntoFolder", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"VersVers_AsSubfolerInEachFolder", type:"boolean", controlname:"jqxVersVers_AsSubfolerInEachFolderCb", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"VersVers_RecreateTreeBelow", type:"boolean", controlname:"jqxVersVers_RecreateTreeBelowCb", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"VersVers_KeepOneVersionOfDeletedFiles", type:"boolean", controlname:"jqxVersVers_KeepOneVersionOfDeletedFilesCb", controltype:"jqxCheckBox", default: true});
  GProfileEditorRegistryList.push({fieldname:"VersVers_FileNameEncoding", type:"boolean", controlname:"jqxVersVers_FileNameEncodingCb", controltype:"jqxCheckBox", default: false});
  GProfileEditorRegistryList.push({fieldname:"VersVers_DontRenameNewestOlderVersion", type:"boolean", controlname:"jqxVersVers_DontRenameNewestOlderVersionCb", controltype:"jqxCheckBox", default: false});
    
  GProfileEditorRegistryList.push({fieldname:"VersVers_RenamingOlderVersions", type:"string", controlname:"VersVers_RenamingOlderVersionsWidget", controltype:"ButtonGroup", default: "VersVers_Add_Prefix_Mode",
   getfunc: function()
   {
      return GetCheckedRadiobuttonName( $("#VersVers_Add_Prefix_Mode"),  $("#VersVers_Add_Timestamp_Mode"), null, null, null, null ); 

   }, setfunc: function( option )
   {
        SetRadioGroupChecked( option,   $("#VersVers_Add_Prefix_Mode"),  $("#VersVers_Add_Timestamp_Mode"), null, null, null, null ); 

   }}); 


    function EnableDisableVersionsSynthBackup() 
    {
        
       if (GetCheckBoxValue("jqxVersSynth_UseSynthBackupsCb") == false )
       {
           DisableCheckBox("jqxVersSynth_UseCheckPointsCb", true); 
           $("#jqxVersSynth_CreateCheckpointCombo").jqxDropDownList( 'disabled', true );
           $("#jqxVersSynth_CheckpointsRelativeCombo").jqxDropDownList( 'disabled', true );
           DisableCheckBox("jqxVersSynth_BuildAllIncrementalCb", true); 
           DisableCheckBox("jqxVersSynth_RemoveUnneededCb", true); 
           $("#inptVersSynth_RemoveUnneeded").jqxFormattedInput( 'disabled', true );
           $("#jqxVersSynth_RemoveUnneededCombo").jqxDropDownList( 'disabled', true );
           DisableCheckBox("jqxVersSynth_IfAllBlocksCb", true); 
       }
       else
       {
           DisableCheckBox("jqxVersSynth_UseCheckPointsCb", false); 
           var UseCheckPoints = GetCheckBoxValue("jqxVersSynth_UseCheckPointsCb");
           
           $("#jqxVersSynth_CreateCheckpointCombo").jqxDropDownList( 'disabled', !UseCheckPoints );
           $("#jqxVersSynth_CheckpointsRelativeCombo").jqxDropDownList( 'disabled', !UseCheckPoints );
           DisableCheckBox("jqxVersSynth_BuildAllIncrementalCb", !UseCheckPoints); 
           
           var RemoveUnneeded = GetCheckBoxValue("jqxVersSynth_RemoveUnneededCb");
           DisableCheckBox("jqxVersSynth_RemoveUnneededCb", false); 
           $("#inptVersSynth_RemoveUnneeded").jqxFormattedInput( 'disabled', !RemoveUnneeded );
           $("#jqxVersSynth_RemoveUnneededCombo").jqxDropDownList( 'disabled', !RemoveUnneeded );
           DisableCheckBox("jqxVersSynth_IfAllBlocksCb", false); 
       }                    
   };


   GProfileEditorRegistryList.push({fieldname:"VersSynth_UseSynthBackups", type:"boolean", controlname:"jqxVersSynth_UseSynthBackupsCb", controltype:"jqxCheckBox", default: false,
   OnChange : function(){EnableDisableVersionsSynthBackup();}
    });
   GProfileEditorRegistryList.push({fieldname:"VersSynth_UseCheckPoints", type:"boolean", controlname:"jqxVersSynth_UseCheckPointsCb", controltype:"jqxCheckBox", default: true,
   OnChange : function(){EnableDisableVersionsSynthBackup();}
 });
   GProfileEditorRegistryList.push({fieldname:"VersSynth_CreateCheckpointComboIndex", type:"number", controlname:"jqxVersSynth_CreateCheckpointCombo", controltype:"jqxDropDownList", default: "1",
     width: 100, height: 25, ComboSource : [ 'Day', 'Week', 'Month', 'Quarter', 'Year' ]});      
   GProfileEditorRegistryList.push({fieldname:"VersSynth_CheckpointsRelativeComboIndex", type:"number", controlname:"jqxVersSynth_CheckpointsRelativeCombo", controltype:"jqxDropDownList", default: "1",
     width: 550, height: 25, ComboSource : [ 'The initial file version',  'The previous higher checkpoint (week/month/quarter)', 'The previous higher checkpoint (maximum distance: month)',
             'The previous higher checkpoint (maximum distance: week)', 'The closest preseeding checkpoint' ]});
   GProfileEditorRegistryList.push({fieldname:"VersSynth_BuildAllIncremental", type:"boolean", controlname:"jqxVersSynth_BuildAllIncrementalCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersSynth_RemoveUnneededCb", type:"boolean", controlname:"jqxVersSynth_RemoveUnneededCb", controltype:"jqxCheckBox", default: false,
   OnChange : function(){EnableDisableVersionsSynthBackup();}

    });

   GProfileEditorRegistryList.push({fieldname:"VersSynth_RemoveUnneeded", type:"decimal", controlname:"inptVersSynth_RemoveUnneeded", controltype:"jqxFormattedInput", spinButtons:  true,default: "0"});
   GProfileEditorRegistryList.push({fieldname:"VersSynth_RemoveUnneededComboIndex", type:"number", controlname:"jqxVersSynth_RemoveUnneededCombo", controltype:"jqxDropDownList", default: "1",
     width: 350, height: 25, ComboSource :[ 'Keep all checkpoints', 'Thin out checkpoints dynamically','Remove all unneeded checkpoints' ]});         

   GProfileEditorRegistryList.push({fieldname:"VersSynth_IfAllBlocksCb", type:"boolean", controlname:"jqxVersSynth_IfAllBlocksCb", controltype:"jqxCheckBox", default: false});
   
    
   GProfileEditorRegistryList.push({fieldname:"VersMore_DoNotDecodeLeftHandCb", type:"boolean", controlname:"jqxVersMore_DoNotDecodeLeftHandCb", controltype:"jqxCheckBox", default:  true});
   GProfileEditorRegistryList.push({fieldname:"VersMore_DoNotDecodeRightHandCb", type:"boolean", controlname:"jqxVersMore_DoNotDecodeRightHandCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"EncodeWithWindows10Mangling", type:"boolean", controlname:"cbEncodeWithWindows10Mangling", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"DecodeAllManglingFormats", type:"boolean", controlname:"cbDecodeAllManglingFormats", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_CleanUpIdenticalCb", type:"boolean", controlname:"jqxVersMore_CleanUpIdenticalCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_CleanUpDuplicatesOnSourceSide", type:"boolean", controlname:"jqxVersMore_CleanUpDuplicatesOnSourceSideCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_RemoveParenthesizedCb", type:"boolean", controlname:"jqxVersMore_RemoveParenthesizedCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_RemoveVesioningTagsCb", type:"boolean", controlname:"jqxVersMore_RemoveVesioningTagsCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_CleanUpAllOlderVersionsCb", type:"boolean", controlname:"jqxVersMore_CleanUpAllOlderVersionsCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"VersMore_FilesBackupV4Cb", type:"boolean", controlname:"jqxVersMore_FilesBackupV4Cb", controltype:"jqxCheckBox", default: false});
                
                    
   GProfileEditorRegistryList.push({fieldname:"Zipping_LimitInpt", type:"string", controlname:"inptZipping_Limit", controltype:"jqxInput", default: "",  width: 100, height: 25});
   
function EnableDisableZipTab()
{
  // it's more complicated
  // the only depencency we really need is the edit field after "Limit Zip File Size To"
};

var GInZipPkg=false;
function InZipPkgClose()
{
  GInZipPkg=false;
  EnableDisableZipTab();
}

var ZipCompressionLevels = ['None','Fast','Normal','Maximum'];
var SzCompressionLevels = ['None','Ultrafast','Medium','Enhanced','Maximum'];
var SevenZipCompressionLevels = ['None','Fastest','Fast','Normal','Maximum','Ultra'];

function ZipFormatChange()
{
  if (!GAllowLZMA)
     SzCompressionLevels = ['None','Ultrafast'];

  // alert("GAllowLZMA:" +GAllowLZMA+", SzCompressionLevels="+SzCompressionLevels);

  var format = $("#jqxZipFormatCombo").jqxDropDownList('getSelectedIndex');
  if (format==1) // sz
  {
     $("#jqxZipLevelCombo").jqxDropDownList( { source: SzCompressionLevels });
  }
  else
  if (format==2) // 7-Zip
  {
     $("#jqxZipLevelCombo").jqxDropDownList( { source: SevenZipCompressionLevels });
  }
  else
  {  // zip
     $("#jqxZipLevelCombo").jqxDropDownList( { source: ZipCompressionLevels });
  }
}

   GProfileEditorRegistryList.push({fieldname:"Zipping_ZipEachFile", type:"boolean", controlname:"jqxZipping_ZipEachFileCb", controltype:"jqxCheckBox", default: false,
   OnChange: function (event)
   {
      Lischecked = $("#jqxZipping_ZipEachFileCb").jqxCheckBox('checked');

      if (Lischecked)
      {
         GInZipPkg = true;
         $("#jqxZipping_UseZipPackagesCb").jqxCheckBox( 'val',  false );
         GInZipPkg = false;
      }
      EnableDisableZipTab();
   }});

   GProfileEditorRegistryList.push({fieldname:"ZipFormat", type:"number", controlname:"jqxZipFormatCombo", controltype:"jqxDropDownList", default: "0",
     width: 600, height: 25,
     ComboSource : [ '.zip (standardized but needs temp file for uploading via Internet Protocol)',
                     '.sz  (new streaming format with better compression and direct uploads)',
                     '.7z  (7-Zip format)'],
     OnChange : ZipFormatChange
     });

   GProfileEditorRegistryList.push({fieldname:"ZipLevel", type:"number", controlname:"jqxZipLevelCombo", controltype:"jqxDropDownList", default: "3",
     width: 300, height: 25, ComboSource : ZipCompressionLevels});

   var HTML_Zip_PackageConfigurationDlg = "";
   var GUseRemoteUnzipService = false;
   var GUseProfileNameForPackage = false;
   var GSeparateZipPerFolder = false;
   var GZip_TimestampZIPs = true;
   var GZip_ReplaceZIPPackages = false;
   var GZip_FilesPerPackage = 25000;
   var GZip_MaxSizeForPackage = "50G";

   var GCopyADS =  true;
   var GCompareADS = false;
   var GApplyADSToCompressedFiles = false;        // V9
   var GPutADSIntoCompressedFiles = true;         // V9
   var GFolderADSinMetadataFilesLeft = false;     // V9
   var GFolderADSinMetadataFilesRight = false;    // V9

   var GSplitResourceForksCb = false;

  
  var funcOnChangeZip_TimestampZIPs = function()
  {
  // it's more complicated than this! NOT CORRECT
  /*
     var Lischecked = GetCheckBoxValue("jqxZip_TimestampZIPs");
     DisableCheckBox("jqxZip_ReplaceZIPPackages", Lischecked);
  */
  };

  var funcEnableDisablePackageConfiguration = function EnableDisablePackageConfiguration()
  {
  // it's more complicated than this! NOT CORRECT
  /*
     var Lischecked = GetCheckBoxValue("jqxZip_UseZipPackages");
     DisableCheckBox("jqxZip_UseRemoteUnzipService", !Lischecked);
     DisableCheckBox("jqxZip_UseProfileNameForPackage", !Lischecked);
     DisableCheckBox("jqxZip_TimestampZIPs", !Lischecked);
     Lischecked1 = GetCheckBoxValue("jqxZip_TimestampZIPs");
     DisableCheckBox("jqxZip_ReplaceZIPPackages", Lischecked1 || !Lischecked);
  */
  };
  
   function Zip_PackageConfigurationDlg()
   {
      
      if (GIsmobileApplication) return;
      if (GInZipPkg == true) return;
      GInZipPkg = true; 
      $("#jqxZip_PackageConfigurationDlg").jqxWindow({ maxWidth: 580,  width: 580, maxHeight:600, height:600, autoOpen: false, isModal: true,
              theme: 'energyblue', animationType: 'slide' });
      CreateCheckBox("jqxZip_UseZipPackages", null, null, funcEnableDisablePackageConfiguration);
      SetCheckBoxValue("jqxZip_UseZipPackages", true);
      
      CreateCheckBox("jqxZip_UseRemoteUnzipService");
      SetCheckBoxValue("jqxZip_UseRemoteUnzipService", GUseRemoteUnzipService);
      
      CreateCheckBox("jqxZip_UseProfileNameForPackage");
      SetCheckBoxValue("jqxZip_UseProfileNameForPackage", GUseProfileNameForPackage);

      CreateCheckBox("jqxZip_SeparateZipPerFolder");
      SetCheckBoxValue("jqxZip_SeparateZipPerFolder", GSeparateZipPerFolder);

      CreateCheckBox("jqxZip_TimestampZIPs"); // , null, null, funcOnChangeZip_TimestampZIPs);
      SetCheckBoxValue("jqxZip_TimestampZIPs", GZip_TimestampZIPs);
      
      CreateCheckBox("jqxZip_ReplaceZIPPackages");
      SetCheckBoxValue("jqxZip_ReplaceZIPPackages", GZip_ReplaceZIPPackages);
      
      $("#inptFilesPerPackage").jqxNumberInput({ width: 100, height: 25, inputMode: 'simple', decimalDigits: 0, spinButtons: true, value : GZip_FilesPerPackage});
      $("#inptMaxSizeForPackage").jqxInput({ width: 100, height: 25  , value : GZip_MaxSizeForPackage});

      $("#Zip_PackageConfiguration_OK_btn").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $("#Zip_PackageConfiguration_OK_btn").click(function ()
      {

        GUseRemoteUnzipService = GetCheckBoxValue("jqxZip_UseRemoteUnzipService");
        GUseProfileNameForPackage = GetCheckBoxValue("jqxZip_UseProfileNameForPackage");
        GSeparateZipPerFolder = GetCheckBoxValue("jqxZip_SeparateZipPerFolder");
        GZip_TimestampZIPs = GetCheckBoxValue("jqxZip_TimestampZIPs");
        GZip_ReplaceZIPPackages = GetCheckBoxValue("jqxZip_ReplaceZIPPackages");
        GZip_FilesPerPackage = $("#inptFilesPerPackage").jqxNumberInput( 'getDecimal' );

        GZip_MaxSizeForPackage = $("#inptMaxSizeForPackage").jqxInput( 'value' );

        GInZipPkg = true; // avoid recursion
        var Lischecked = GetCheckBoxValue("jqxZip_UseZipPackages");
        //$("#jqxZipping_UseZipPackagesCb").jqxCheckBox( 'checked', Lischecked );
        SetCheckBoxValue("jqxZipping_UseZipPackagesCb",  Lischecked );
        if (Lischecked)
        {
           SetCheckBoxValue("jqxZipping_ZipEachFileCb",  false );
        }
        $("#jqxZip_PackageConfigurationDlg").jqxWindow('close');
      });                

      $("#Zip_PackageConfiguration_Cancel_btn").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
      $("#Zip_PackageConfiguration_Cancel_btn").click(function ()
      {
        var Lischecked = GetCheckBoxValue("jqxZip_UseZipPackages");
        SetCheckBoxValue("jqxZipping_UseZipPackagesCb",  Lischecked );
        $("#jqxZip_PackageConfigurationDlg").jqxWindow('close');
      });


       $('#jqxZip_PackageConfigurationDlg').on('close', function (event) {           
        setTimeout(InZipPkgClose, 2000);                                   
       }); 


      $("#jqxZip_PackageConfigurationDlg").jqxWindow('open');   
      funcEnableDisablePackageConfiguration();
   }

   GProfileEditorRegistryList.push({fieldname:"Zipping_UseZipPackages", type:"boolean", controlname:"jqxZipping_UseZipPackagesCb", controltype:"jqxCheckBox", default: false,

    OnChange: function( event )
    {
      if (!GInZipPkg)
      {
       if (HTML_Zip_PackageConfigurationDlg == "" )
       {
          var client = new XMLHttpRequest();  
          client.open('GET', '/Zip_PackageConfigurationDlg.html');
          client.onreadystatechange = function() 
          {                              
            if (client.readyState == XMLHttpRequest.DONE)
            {
              HTML_Zip_PackageConfigurationDlg = client.responseText;
              if (HTML_Zip_PackageConfigurationDlg != "")
              {
                 $("#HTML_Zip_PackageConfigurationDlg_div").html( HTML_Zip_PackageConfigurationDlg );
                 setTimeout(Zip_PackageConfigurationDlg, 100);
              }
            }
          }
          client.send();                 
       }
       else
         Zip_PackageConfigurationDlg();
      }
     } 
   });

   GProfileEditorRegistryList.push({fieldname:"Zipping_ZipDirectlyToDestination", type:"boolean", controlname:"jqxZipping_ZipDirectlyToDestinationCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"Zipping_UnzipAllfiles", type:"boolean", controlname:"jqxZipping_UnzipAllfilesCb", controltype:"jqxCheckBox", default: false});
   GProfileEditorRegistryList.push({fieldname:"Zipping_LimitZipFileSizeCb", type:"boolean", controlname:"jqxZipping_LimitZipFileSizeCb", controltype:"jqxCheckBox", default: false});
 
   function EnableDisableEncryptionTab()
   {
      var Lischecked = GetCheckBoxValue("jqxZippingEncrypt_EncryptFilesCb");
      $("#jqxZippingEncrypt_Combo").jqxDropDownList('disabled', !Lischecked); 
   }

   GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_EncryptFiles", type:"boolean", controlname:"jqxZippingEncrypt_EncryptFilesCb", controltype:"jqxCheckBox", default: false,
                                     OnChange: EnableDisableEncryptionTab});
   GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_DecryptFiles", type:"boolean", controlname:"jqxZippingEncrypt_DecryptFilesCb", controltype:"jqxCheckBox", default:  true});
   GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_Password", type:"string", controlname:"jqxZippingEncrypt_Password", controltype:"jqxPasswordInput", width: 400, height: 25, showStrength: false, showStrengthPosition: "right", default: ""});
   GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_ComboIndex", type:"number", controlname:"jqxZippingEncrypt_Combo", controltype:"jqxDropDownList", default: "",
     width: 350, height: 25, ComboSource : [ 'ZIP-Compatible AES (256 bit)', 'ZIP-Compatible AES (192 bit)', 'ZIP-Compatible AES (128 bit)', 'Classic ZIP Password' ]}); 

   // Tabsheet Schedule ->Schedule

var reg_NextRunDay={fieldname:"NextRunDay_Input", type:"date", controlname:"jqxNextRunDay_Input", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GDateFormat, showCalendarButton: true,   value: null};
   GProfileEditorRegistryList.push(reg_NextRunDay);
var reg_NextRunTime={fieldname:"NextRunTime_Input", type:"time", controlname:"jqxNextRunTime_Input", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
   GProfileEditorRegistryList.push(reg_NextRunTime);

// Tabsheet Schedule ->WeekDays and TimeWindow
var reg_jqxRunOnlyBetweenCb =  {fieldname:"RunOnlyBetweenCb", type:"boolean", controlname:"jqxRunOnlyBetweenCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxRunOnlyBetweenCb);
var reg_jqxRunOnlyMinTime_Input = {fieldname:"RunOnlyMinTime", type:"time", controlname:"jqxRunOnlyMinTime_Input", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxRunOnlyMinTime_Input);
var reg_jqxRunOnlyMaxTime_Input = {fieldname:"RunOnlyMaxTime", type:"time", controlname:"jqxRunOnlyMaxTime_Input", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxRunOnlyMaxTime_Input);
var reg_jqxIgnoreTimeWindowOnWeekendsCb = {fieldname:"IgnoreTimeWindowOnWeekends", type:"boolean", controlname:"jqxIgnoreTimeWindowOnWeekendsCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxIgnoreTimeWindowOnWeekendsCb);
var reg_jqxInterruptMiddleOfFileCb = {fieldname:"InterruptMiddleOfFile", type:"boolean", controlname:"jqxInterruptMiddleOfFileCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxInterruptMiddleOfFileCb);
var reg_jqxStopRunningProfilesCb = {fieldname:"StopRunningProfiles", type:"boolean", controlname:"jqxStopRunningProfilesCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxStopRunningProfilesCb);
// Tabsheet Schedule ->More
var reg_jqxAdditionalTimes_Time_Input1 = {fieldname:"AdditionalTimes_Time_Input1", type:"time", controlname:"jqxAdditionalTimes_Time_Input1", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxAdditionalTimes_Time_Input1);
var reg_jqxAdditionalTimes_Time_Input2 = {fieldname:"AdditionalTimes_Time_Input2", type:"time", controlname:"jqxAdditionalTimes_Time_Input2", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxAdditionalTimes_Time_Input2);
var reg_jqxAdditionalTimes_Time_Input3 = {fieldname:"AdditionalTimes_Time_Input3", type:"time", controlname:"jqxAdditionalTimes_Time_Input3", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxAdditionalTimes_Time_Input3);
var reg_jqxAdditionalTimes_Time_Input4 = {fieldname:"AdditionalTimes_Time_Input4", type:"time", controlname:"jqxAdditionalTimes_Time_Input4", controltype:"jqxDateTimeInput", width: 110, height: 25, formatString: GLongTimeFormat, showCalendarButton: false};
GProfileEditorRegistryList.push(reg_jqxAdditionalTimes_Time_Input4);

var reg_jqxUseAdditionalTimes1Cb = {fieldname:"UseAdditionalTimes1", type:"boolean", controlname:"jqxUseAdditionalTimes1Cb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxUseAdditionalTimes1Cb);
var reg_jqxUseAdditionalTimes2Cb = {fieldname:"UseAdditionalTimes2", type:"boolean", controlname:"jqxUseAdditionalTimes2Cb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxUseAdditionalTimes2Cb);
var reg_jqxUseAdditionalTimes3Cb =  {fieldname:"UseAdditionalTimes3", type:"boolean", controlname:"jqxUseAdditionalTimes3Cb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxUseAdditionalTimes3Cb);
var reg_jqxUseAdditionalTimes4Cb = {fieldname:"UseAdditionalTimes4", type:"boolean", controlname:"jqxUseAdditionalTimes4Cb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxUseAdditionalTimes4Cb);
// Tabsheet Schedule ->RealTime

var reg_Real_MonitoringRunOnlyOnceWidget = {fieldname:"Real_MonitoringRunOnlyOnceWidget", type:"string", controlname:"Real_MonitoringRunOnlyOnceWidget", controltype:"ButtonGroup", default: "Real_Once_Mode",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#Real_Once_Mode"),  $("#Real_Repeatedly_Mode"), null, null, null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked( option, $("#Real_Once_Mode"),  $("#Real_Repeatedly_Mode"), null, null, null, null );
}};
GProfileEditorRegistryList.push(reg_Real_MonitoringRunOnlyOnceWidget);
var reg_jqxRealUseMinimumPauseCb = {fieldname:"RealUseMinimumPause", type:"boolean", controlname:"jqxRealUseMinimumPauseCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxRealUseMinimumPauseCb);
var reg_jqx_RealPauseHoursInput = {fieldname:"RealPauseHours", type:"number", controlname:"jqx_RealPauseHoursInput", controltype:"jqxNumberInput", spinButtons:  true,default: 0, value: 0, width: 30, height: 25};
GProfileEditorRegistryList.push(reg_jqx_RealPauseHoursInput);
var reg_jqx_RealPauseMinutesInput = {fieldname:"RealPauseMinutes", type:"number", controlname:"jqx_RealPauseMinutesInput", controltype:"jqxNumberInput", default: 0, value: 0, width: 30, height: 25};
GProfileEditorRegistryList.push(reg_jqx_RealPauseMinutesInput);
var reg_jqx_RealPauseSecondsInput = {fieldname:"RealPauseSeconds", type:"number", controlname:"jqx_RealPauseSecondsInput", controltype:"jqxNumberInput", default: 0, value: 0, width: 30, height: 25};
GProfileEditorRegistryList.push(reg_jqx_RealPauseSecondsInput);

 // Tabsheet Schedule Monitorin/RealTime -> RealTime Settings
GProfileEditorRegistryList.push({fieldname:"RunCompletelyOnce", type:"boolean", controlname:"GRunCompletelyOnceCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"RealtimeFolderMode", type:"boolean", controlname:"GRealtimeFolderMode", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"RealTimeDeletions", type:"boolean", controlname:"GRealTimeDeletions", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"RealTimeDeletionsSafetyDelay", type:"number", controlname:"GRealTimeDeletionsSafetyDelay", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"RealTimeRenames", type:"boolean", controlname:"GRealTimeRenames", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"RealTimeIgnoreTempFiles", type:"boolean", controlname:"GRealTimeIgnoreTempFiles", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"RealtimeDelaySeconds", type:"number", controlname:"GRealtimeDelaySeconds", controltype:"variable", default: 5});
GProfileEditorRegistryList.push({fieldname:"FullRunBasedOnItemCount", type:"number", controlname:"GFullRunBasedOnItemCount", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"FullRunBasedOnTimeSeconds", type:"number", controlname:"GFullRunBasedOnTimeSeconds", controltype:"variable", default: 0});

// V9
GProfileEditorRegistryList.push({fieldname:"RealtimeCheckFTPForChanges", type:"boolean", controlname:"GRealtimeCheckFTPForChanges", controltype:"variable", default: true});
GProfileEditorRegistryList.push({fieldname:"UseFTPChangesTechniqueForLeftSide", type:"boolean", controlname:"GUseFTPChangesTechniqueForLeftSide", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"UseFTPChangesTechniqueForRightSide", type:"boolean", controlname:"GUseFTPChangesTechniqueForRightSide", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"FTPChangesCheckIntervalSeconds", type:"boolean", controlname:"GFTPChangesCheckIntervalSeconds", controltype:"variable", default: 60});

var reg_jqx_RealMonitoringIntervalSeconds = {fieldname:"MonitoringIntervalSeconds", type:"number", controlname:"jqx_RealMonitoringIntervalSeconds", controltype:"jqxNumberInput", spinButtons:  true,default: 0, value: 0, width: 30, height: 25};
GProfileEditorRegistryList.push(reg_jqx_RealMonitoringIntervalSeconds);

// Tabsheet Files->Deletion ->FoldersForDeletedFiles Dlg
GProfileEditorRegistryList.push({fieldname:"MoveDeletedFilesIntoFolderL", type:"string", controlname:"GMoveDeletedFilesIntoFolderL", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"MoveDeletedFilesIntoFolderR", type:"string", controlname:"GMoveDeletedFilesIntoFolderR", controltype:"variable", default: ""});

// Tabsheet Files-> File Access
var reg_jqxFAIgnoreAccessDeniedFoldersCb = {fieldname:"FAIgnoreAccessDeniedFolders", type:"boolean", controlname:"jqxFAIgnoreAccessDeniedFoldersCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreAccessDeniedFoldersCb);
var reg_jqxFAIgnoreAccessDeniedFilesCb = {fieldname:"FAIgnoreAccessDeniedFiles", type:"boolean", controlname:"jqxFAIgnoreAccessDeniedFilesCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreAccessDeniedFilesCb);
var reg_jqxFAIgnoreMissingFilesCb = {fieldname:"FAIgnoreMissingFiles", type:"boolean", controlname:"jqxFAIgnoreMissingFilesCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreMissingFilesCb);
var reg_jqxFAIgnoreLockedFilesOnDestCb = {fieldname:"FAIgnoreLockedFilesOnDest", type:"boolean", controlname:"jqxFAIgnoreLockedFilesOnDestCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreLockedFilesOnDestCb);
var reg_jqxFAIgnoreDeletionErrorsCb =  {fieldname:"FAIgnoreDeletionErrors", type:"boolean", controlname:"jqxFAIgnoreDeletionErrorsCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreDeletionErrorsCb);
var reg_jqxFAIgnoreDeletingFolderErrorsCb = {fieldname:"FAIgnoreDeletingFolderErrors", type:"boolean", controlname:"jqxFAIgnoreDeletingFolderErrorsCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxFAIgnoreDeletingFolderErrorsCb);

// Tabsheet Comparison->Comparison
var reg_jqxComparAdjustTimestampOnlyCb = {fieldname:"ComparAdjustTimestampOnly", type:"boolean", controlname:"jqxComparAdjustTimestampOnlyCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxComparAdjustTimestampOnlyCb);
// Tabsheet Comparison->More
var reg_jqxComparStripReadOnlyAttrCb = {fieldname:"ComparStripReadOnlyAttr", type:"boolean", controlname:"jqxComparStripReadOnlyAttrCb", controltype:"jqxCheckBox", default: false};
GProfileEditorRegistryList.push(reg_jqxComparStripReadOnlyAttrCb);
// Tabsheet Folders
GProfileEditorRegistryList.push({fieldname:"Folders_IntermediateRightPath", type:"string", controlname:"GIntermediateRightPath", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"Folders_ContinueAfterInterimIncomplete", type:"boolean", controlname:"GFolders_ContinueAfterInterimIncomplete", controltype:"variable", default: false});

var InsideOfShowFoldersIntermediateLocationDlg = false;
function InsideOfShowFoldersIntermediateLocationDlgClose()
{
  InsideOfShowFoldersIntermediateLocationDlg = false;
  if (GProfileEditorFormOpen)
     EnableCheckBox('jqxFolders_UseIntermediateLocationCb');
}

function ShowFoldersIntermediateLocationDlg()
{
 if (GIsmobileApplication)
   return;
 if (InsideOfShowFoldersIntermediateLocationDlg == true) return;
 InsideOfShowFoldersIntermediateLocationDlg = true;
 DisableCheckBox('jqxFolders_UseIntermediateLocationCb');
 $('#jqxFoldersIntermediateLocationDlg').jqxWindow({ maxWidth: 600,  width: 600, maxHeight:250, height:250, autoOpen: false, isModal: true,
             theme: 'energyblue', animationType: 'slide' });

 $("#inptIntermediateRightPath").jqxInput({ width : 300, height : 25   });
 $("#inptIntermediateRightPath").jqxInput('val', GIntermediateRightPath);

CreateCheckBox("jqxFolders_ContinueAfterInterimIncomplete");
SetCheckBoxValue("jqxFolders_ContinueAfterInterimIncomplete", GFolders_ContinueAfterInterimIncomplete);
//$('#jqxFolders_ContinueAfterInterimIncomplete').jqxCheckBox({ width: 450, height: 25, checked : GFolders_ContinueAfterInterimIncomplete   });


 $('#FoldersIntermLocation_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
 $('#FoldersIntermLocation_OK_btn').click(function () {
   GIntermediateRightPath = $("#inptIntermediateRightPath").jqxInput('val');
   GFolders_ContinueAfterInterimIncomplete = GetCheckBoxValue('jqxFolders_ContinueAfterInterimIncomplete');
   SetCheckBoxValue('jqxFolders_UseIntermediateLocationCb', GIntermediateRightPath != "");
   $('#jqxFoldersIntermediateLocationDlg').jqxWindow('close');
   setTimeout(InsideOfShowFoldersIntermediateLocationDlgClose, 2000);
 });

 $('#FoldersIntermLocation_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
 $('#FoldersIntermLocation_Cancel_btn').click(function () {

   $('#jqxFoldersIntermediateLocationDlg').jqxWindow('close');
 });




 $('#jqxFoldersIntermediateLocationDlg').jqxWindow('open');
}

var reg_jqxFolders_UseIntermediateLocationCb = {fieldname:"Folders_UseIntermediateLocation", type:"boolean", controlname:"jqxFolders_UseIntermediateLocationCb", controltype:"jqxCheckBox", default: false,
OnChange: function( event )
 {
    if (InsideOfShowFoldersIntermediateLocationDlg == true) return;
     if (HTML_FoldersIntermediateLocationDlg == "")
     {
         var client = new XMLHttpRequest();
         client.open('GET', '/FoldersIntermediateLocationDlg.html');
             client.onreadystatechange = function()
             {
                if (client.readyState == XMLHttpRequest.DONE)
                {
                  HTML_FoldersIntermediateLocationDlg = client.responseText;
                  if (HTML_FoldersIntermediateLocationDlg != "" )
                  {
                     $("#HTML_FoldersIntermediateLocationDlg_div").html( HTML_FoldersIntermediateLocationDlg );
                     setTimeout(ShowFoldersIntermediateLocationDlg, 100);
                  }
                }
             }
             client.send();
      }
      else
         ShowFoldersIntermediateLocationDlg();
 }};
GProfileEditorRegistryList.push(reg_jqxFolders_UseIntermediateLocationCb);

// Tabsheet Schedule ->Monitoring
var reg_jqx_RealMonitoringIntervalMinutes = {fieldname:"MonitoringIntervalMinutes", type:"number", controlname:"jqx_RealMonitoringIntervalMinutes", controltype:"jqxNumberInput", spinButtons:  true,default: 0, value: 0, width: 30, height: 25};
 GProfileEditorRegistryList.push(reg_jqx_RealMonitoringIntervalMinutes);
// Tabsheet Job
GProfileEditorRegistryList.push({fieldname:"Job_RunAsUser", type:"string", controlname:"GJob_RunAsUser", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_RunAsDomain", type:"string", controlname:"GJob_RunAsDomain", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_RunAsPassword", type:"string", controlname:"GJob_RunAsPassword", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_ScanningThreads", type:"number", controlname:"inptScanningThreads", controltype:"jqxNumberInput", spinButtons:  true,default: 0, value: 0, width: 30, height: 25});

GProfileEditorRegistryList.push({fieldname:"JobFilesThreadsRadiogroupWidget", type:"string", controlname:"JobFilesThreadsRadiogroupWidget", controltype:"ButtonGroup", default: "Job_Threads_Default_Radio_Mode",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#Job_Threads_Default_Radio_Mode"),  $("#Job_Threads_Custom_Radio_Mode"), null, null, null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option,   $("#Job_Threads_Default_Radio_Mode"),  $("#Job_Threads_Custom_Radio_Mode"), null, null, null, null );
}});

GProfileEditorRegistryList.push({fieldname:"Job_ExecuteBefore", type:"string", controlname:"GJob_ExecuteBefore", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_ExecuteAfter", type:"string", controlname:"GJob_ExecuteAfter", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_NoEmail", type:"boolean", controlname:"GJob_NoEmail", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_EmailAlways", type:"boolean", controlname:"GJob_EmailAlways", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_NoLogFileAttach", type:"boolean", controlname:"GJob_NoLogFileAttach", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_EmailDontAttachFile", type:"boolean", controlname:"GJob_EmailDontAttachFile", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_EmailOnlyWhenError", type:"boolean", controlname:"GJob_EmailOnlyWhenError", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_EmailIfNothing", type:"boolean", controlname:"GJob_EmailIfNothing", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_NoDriveMissingEmail", type:"boolean", controlname:"GJob_NoDriveMissingEmail", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_EmailFilesOverride", type:"string", controlname:"GJob_EmailFilesOverride", controltype:"variable", default: "cbGrayed"});
GProfileEditorRegistryList.push({fieldname:"Job_OverrideRecipients", type:"string", controlname:"GJob_OverrideRecipients", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_AddRecipients", type:"boolean", controlname:"GJob_AddRecipients", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_MakeConnection1", type:"boolean", controlname:"GJob_MakeConnection1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Job_MakeConnection2", type:"boolean", controlname:"GJob_MakeConnection2", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"JobNetworkPath1", type:"string", controlname:"GJobNetworkPath1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobNetworkPath2", type:"string", controlname:"GJobNetworkPath2", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobNetworkUsername1", type:"string", controlname:"GJobNetworkUsername1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobNetworkPassword1", type:"string", controlname:"GJobNetworkPassword1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobNetworkUsername2", type:"string", controlname:"GJobNetworkUsername2", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobNetworkPassword2", type:"string", controlname:"GJobNetworkPassword2", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobReconnect1", type:"boolean", controlname:"GJobReconnect1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobReconnect2", type:"boolean", controlname:"GJobReconnect2", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobDisconnect1", type:"boolean", controlname:"GJobDisconnect1", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"JobDisconnect2", type:"boolean", controlname:"GJobDisconnect2", controltype:"variable", default: ""});
//Masks
GProfileEditorRegistryList.push({fieldname:"Masks_ScanWholeTreeForFolderMasks", type:"boolean", controlname:"GMasks_ScanWholeTreeForFolderMasks", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Masks_IncludeAllSubfoldersOfMatchingFolders", type:"boolean", controlname:"GMasks_IncludeAllSubfoldersOfMatchingFolders", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Masks_ProcessFoundFoldersOnlyIfExistOnBothSides", type:"boolean", controlname:"GMasks_ProcessFoundFoldersOnlyIfExistOnBothSides", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Masks_FolderMasks", type:"string", controlname:"GMasks_FolderMasks", controltype:"variable", default: "", value: ""});
GProfileEditorRegistryList.push({fieldname:"Masks_Restrictions", type:"string", controlname:"GMasks_Restrictions", controltype:"variable", default: "", value: ""});
GProfileEditorRegistryList.push({fieldname:"MasksRestrictionsDirection", type:"string", controlname:"GMasksRestrictionsDirection", controltype:"variable", default: "Masks_RestrictionLTR_Radio_Mode", value: ""});

// Security and Shares Dialog
GProfileEditorRegistryList.push({fieldname:"CompareOwner", type:"boolean", controlname:"GCompareOwner", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"CompareGroup", type:"boolean", controlname:"GCompareGroup", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"ComparePermissions", type:"boolean", controlname:"GComparePermissions", controltype:"variable", default: ""});
if (GisSyncoveryWindows)
{
 GProfileEditorRegistryList.push({fieldname:"Special_CopyOwnerSetting", type:"boolean", controlname:"GSpecial_CopyOwnerSetting", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"Special_CopyGroupSetting", type:"boolean", controlname:"GSpecial_CopyGroupSetting", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"Special_CopyPermissions", type:"boolean", controlname:"GSpecial_CopyPermissions", controltype:"variable", default: ""});

 GProfileEditorRegistryList.push({fieldname:"BreakInheritance", type:"boolean", controlname:"GBreakInheritance", controltype:"variable", default: "", value: true});
 GProfileEditorRegistryList.push({fieldname:"CopyInheritedAsExplicitIfNecessary", type:"boolean", controlname:"GCopyInheritedAsExplicitIfNecessary", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"UpdateFolderSecurity", type:"boolean", controlname:"GUpdateFolderSecurity", controltype:"variable", default: "", value: true});
 GProfileEditorRegistryList.push({fieldname:"TranslateSIDs", type:"boolean", controlname:"GTranslateSIDs", controltype:"variable", default: ""});
}
else
{
  var reg_cbCompareACLs =  {fieldname:"CompareACLs", type:"boolean", controlname:"GCompareACLs", controltype:"variable", default:false};
  GProfileEditorRegistryList.push(reg_cbCompareACLs);
}
GProfileEditorRegistryList.push({fieldname:"Special_ProcessBaseFolder", type:"boolean", controlname:"GSpecial_ProcessBaseFolder", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"UsePermissionFilesLeft", type:"boolean", controlname:"GUsePermissionFilesLeft", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"UsePermissionFilesRight", type:"boolean", controlname:"GUsePermissionFilesRight", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"PutPermissionsIntoCompressedFiles", type:"boolean", controlname:"GPutPermissionsIntoCompressedFiles", controltype:"variable", default: true, value: true});
GProfileEditorRegistryList.push({fieldname:"ApplyPermissionsToCompressedFiles", type:"boolean", controlname:"GApplyPermissionsToCompressedFiles", controltype:"variable", default: ""});

if (GisSyncoveryWindows)
{
 GProfileEditorRegistryList.push({fieldname:"AssumeUnreadableDifferent", type:"boolean", controlname:"GAssumeUnreadableDifferent", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"StripUnknownSIDs", type:"boolean", controlname:"GStripUnknownSIDs", controltype:"variable", default: ""});

 GProfileEditorRegistryList.push({fieldname:"CopyShares", type:"boolean", controlname:"GCopyShares", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"CompareSharePaths", type:"boolean", controlname:"GCompareSharePaths", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"CompareSharePermissions", type:"boolean", controlname:"GCompareSharePermissions", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"ShareSelectedFoldersOnly", type:"boolean", controlname:"GShareSelectedFoldersOnly", controltype:"variable", default: ""});
 GProfileEditorRegistryList.push({fieldname:"ShareTranslatePaths", type:"boolean", controlname:"GShareTranslatePaths", controltype:"variable", default: ""});

 GProfileEditorRegistryList.push({fieldname:"TargetDomain", type:"string", controlname:"GTargetDomain", controltype:"variable", default: ""});
}

// Compression
GProfileEditorRegistryList.push({fieldname:"Zip_UseRemoteUnzipService", type:"boolean", controlname:"GUseRemoteUnzipService", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Zip_UseProfileNameForPackage", type:"boolean", controlname:"GUseProfileNameForPackage", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Zip_SeparateZipPerFolder", type:"boolean", controlname:"GSeparateZipPerFolder", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Zip_TimestampZIPs", type:"boolean", controlname:"GZip_TimestampZIPs", controltype:"variable", default: true, value: true});
GProfileEditorRegistryList.push({fieldname:"Zip_ReplaceZIPPackages", type:"boolean", controlname:"GZip_ReplaceZIPPackages", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Zip_FilesPerPackage", type:"number", controlname:"GZip_FilesPerPackage", controltype:"variable", default: "25000"});
GProfileEditorRegistryList.push({fieldname:"Zip_MaxSizeForPackage", type:"string", controlname:"GZip_MaxSizeForPackage", controltype:"variable", default: "50G"});

// Special->Alternate Data Streams
GProfileEditorRegistryList.push({fieldname:"CopyADS", type:"boolean", controlname:"GCopyADS", controltype:"variable", default: true});
GProfileEditorRegistryList.push({fieldname:"CompareADS", type:"boolean", controlname:"GCompareADS", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"ApplyADSToCompressedFiles", type:"boolean", controlname:"GApplyADSToCompressedFiles", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"PutADSIntoCompressedFiles", type:"boolean", controlname:"GPutADSIntoCompressedFiles", controltype:"variable", default: true});
GProfileEditorRegistryList.push({fieldname:"FolderADSinMetadataFilesLeft", type:"boolean", controlname:"GFolderADSinMetadataFilesLeft", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"FolderADSinMetadataFilesRight", type:"boolean", controlname:"GFolderADSinMetadataFilesRight", controltype:"variable", default: false});

if (GisSyncoveryWindows)
   GProfileEditorRegistryList.push({fieldname:"Special_SplitResourceForksCb", type:"boolean", controlname:"GSplitResourceForksCb", controltype:"variable", default: ""});

// Special
GProfileEditorRegistryList.push({fieldname:"Special_DontFallBackFromPartialCb", type:"boolean", controlname:"jqxSpecial_DontFallBackFromPartialCb", controltype:"jqxCheckBox", default: false});
GProfileEditorRegistryList.push({fieldname:"Special_PartialRemoteOneByOneCb", type:"boolean", controlname:"jqxSpecial_PartialRemoteOneByOneCb", controltype:"jqxCheckBox", default: false});


// SmartTracking
var GSmartTrackingMoveSettingsWidget = "";
var GSmartTrackingDeletedSettingsWidget = "";
var GSmartTrackingConflictingSettingsWidget = "";

var GSmt_DetectUnchangedLeftCb = false;
var GSmt_DetectUnchangedRightCb = false;
var GSmt_DetectServerSizeModsCb = false;
var GSmt_BothNewConflictCb = false;
var GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb = false;
var GSmt_ConflictsAddNumberCb = false;
var GSmt_ConflictsAddUserCb = false;
var GSmt_ConflictsAddTimeCb = false;
var GSmt_ConflictsAddDollarCb = false;
var GSmartTrackingConflictsIfExistsAddNumberWidget = "";


GProfileEditorRegistryList.push({fieldname:"SmartTrackingMoveSettingsWidget", type:"string", controlname:"GSmartTrackingMoveSettingsWidget", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"SmartTrackingDeletedSettingsWidget", type:"string", controlname:"GSmartTrackingDeletedSettingsWidget", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"SmartTrackingConflictingSettingsWidget", type:"string", controlname:"GSmartTrackingConflictingSettingsWidget", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"Smt_DetectUnchangedLeftCb", type:"boolean", controlname:"GSmt_DetectUnchangedLeftCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_DetectUnchangedRightCb", type:"boolean", controlname:"GSmt_DetectUnchangedRightCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_DetectServerSizeModsCb", type:"boolean", controlname:"GSmt_DetectServerSizeModsCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_BothNewConflictCb", type:"boolean", controlname:"GSmt_BothNewConflictCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_BothNewConflictCheckArchiveFlagAndTimestampCb", type:"boolean", controlname:"GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_ConflictsAddNumberCb", type:"boolean", controlname:"GSmt_ConflictsAddNumberCb", controltype:"variable", default: ""});

GProfileEditorRegistryList.push({fieldname:"Smt_ConflictsAddUserCb", type:"boolean", controlname:"GSmt_ConflictsAddUserCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_ConflictsAddTimeCb", type:"boolean", controlname:"GSmt_ConflictsAddTimeCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"Smt_ConflictsAddDollarCb", type:"boolean", controlname:"GSmt_ConflictsAddDollarCb", controltype:"variable", default: ""});
GProfileEditorRegistryList.push({fieldname:"SmartTrackingConflictsIfExistsAddNumberWidget", type:"string", controlname:"GSmartTrackingConflictsIfExistsAddNumberWidget", controltype:"variable", default: ""});

// Exact Mirror Settings
var GMrr_ExactMirrorDeletesCb = false;
var GMrr_DelayDeletionsCb = false;
var GMrr_ExactMirrorOverwritesNewerFilesCb = false;
var GMrr_DeleteNonMatchingFiltersCb = false;
var GMrr_DeleteDeselectedCb = false;
var GMrr_DeleteNonMatchingMasksCb = false;
var GMrr_DelayDelDays = 14;
var GMrr_DelayDelHours = 0;
var GMrr_DelayDelMinutes = 0;
var GMrr_OVDelayDelDays = 14;
var GMrr_OVDelayDelHours = 0;
var GMrr_OVDelayDelMinutes = 0;
var GMrr_OVDelayDeletionsCb = false;

GProfileEditorRegistryList.push({fieldname:"Mrr_ExactMirrorDeletesCb", type:"boolean", controlname:"GMrr_ExactMirrorDeletesCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_ExactMirrorOverwritesNewerFilesCb", type:"boolean", controlname:"GMrr_ExactMirrorOverwritesNewerFilesCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_DeleteNonMatchingFiltersCb", type:"boolean", controlname:"GMrr_DeleteNonMatchingFiltersCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_DeleteDeselectedCb", type:"boolean", controlname:"GMrr_DeleteDeselectedCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_DeleteNonMatchingMasksCb", type:"boolean", controlname:"GMrr_DeleteNonMatchingMasksCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_DelayDeletionsCb", type:"boolean", controlname:"GMrr_DelayDeletionsCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Mrr_DelayDelDays", type:"number", controlname:"GMrr_DelayDelDays", controltype:"variable", default: 14});
GProfileEditorRegistryList.push({fieldname:"Mrr_DelayDelHours", type:"number", controlname:"GMrr_DelayDelHours", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"Mrr_DelayDelMinutes", type:"number", controlname:"GMrr_DelayDelMinutes", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"Mrr_OVDelayDelDays", type:"number", controlname:"GMrr_OVDelayDelDays", controltype:"variable", default: 14});
GProfileEditorRegistryList.push({fieldname:"Mrr_OVDelayDelHours", type:"number", controlname:"GMrr_OVDelayDelHours", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"Mrr_OVDelayDelMinutes", type:"number", controlname:"GMrr_OVDelayDelMinutes", controltype:"variable", default: 0});
GProfileEditorRegistryList.push({fieldname:"Mrr_OVDelayDeletionsCb", type:"boolean", controlname:"GMrr_OVDelayDeletionsCb", controltype:"variable", default: false});

// Move settings
var GMove_MoveByCopyingCb = false;
var GMoveFilesMode = "";
GProfileEditorRegistryList.push({fieldname:"Move_MoveByCopyingCb", type:"boolean", controlname:"GMove_MoveByCopyingCb", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"MoveFilesMode", type:"string", controlname:"GMoveFilesMode", controltype:"variable", default: "mmMoveNormal_Mode", value: ''});


var reg_LeftPath={fieldname:"LeftPath", type:"string", controlname:"GLeftStoredPath", controltype:"variable", value: "", default: ""};
  GProfileEditorRegistryList.push(reg_LeftPath);
var reg_RightPath={fieldname:"RightPath", type:"string", controlname:"GRightStoredPath", controltype:"variable", value: "", default: ""};
  GProfileEditorRegistryList.push(reg_RightPath);

function EnableDisableSafetyUnattended()
{
   if (GetCheckBoxValue("jqxSafetyUnattended_ReplaceMaxPercentCb") == false )
   {
       $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput( 'disabled', true );
   }
   else
   {
       $("#inptSafetyUnattended_ReplaceMaxPercent").jqxFormattedInput( 'disabled', false );
   }

   if (GetCheckBoxValue("jqxSafetyUnattended_FileDeletionAllowedCb") == false )
   {
       $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput( 'disabled', true );
       $("#inptSafetyUnattended_DeleteMaxFiles").jqxFormattedInput( 'disabled', true );
   }
   else
   {
       $("#inptSafetyUnattended_FileDeletionAllowed").jqxFormattedInput( 'disabled', false );
       $("#inptSafetyUnattended_DeleteMaxFiles").jqxFormattedInput( 'disabled', false );
   }

}

// Tabsheet Safety Unattended Mode
GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_ReplaceMaxPercent", type:"decimal", controlname:"inptSafetyUnattended_ReplaceMaxPercent", controltype:"jqxFormattedInput", spinButtons: true, width:80, default: "20", maxvalue: 100});
GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_ReplaceMaxPercentCb", type:"boolean", controlname:"jqxSafetyUnattended_ReplaceMaxPercentCb", controltype:"jqxCheckBox", default:false,
                                OnChange: EnableDisableSafetyUnattended});

GProfileEditorRegistryList.push({fieldname:"SafetyUnattended_FileDeletionAllowedCb", type:"boolean", controlname:"jqxSafetyUnattended_FileDeletionAllowedCb", controltype:"jqxCheckBox", default:false,
                                OnChange: EnableDisableSafetyUnattended});


GProfileEditorRegistryList.push({fieldname:"SubfolderSelections", type:"string", controlname:"GSubfolderSelections", controltype:"variable", value: "", default: ""});
// Tabsheet Zip/Encryption
GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_FilenameEncryption", type:"boolean", controlname:"jqxZippingEncrypt_FilenameEncryptionCb", controltype:"jqxCheckBox", default: false});
GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_FoldernameEncryption", type:"boolean", controlname:"jqxZippingEncrypt_FoldernameEncryptionCb", controltype:"jqxCheckBox", default: false});
GProfileEditorRegistryList.push({fieldname:"ZippingEncrypt_EncryptExistingNames", type:"boolean", controlname:"jqxZippingEncrypt_EncryptExistingNamesCb", controltype:"jqxCheckBox", default: false});

// Tabsheet Special Destination Caching Settings
GProfileEditorRegistryList.push({fieldname:"SpecialSpFeatr_CacheDestinationFileList", type:"boolean", controlname:"GSpecial_CacheDestinationFileList", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Special_DoubleCheckCacheHoles", type:"boolean", controlname:"GSpecial_DoubleCheckCacheHoles", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"Special_RefreshCacheEvery", type:"decimal", controlname:"GSpecial_RefreshCacheEvery", controltype:"variable", value: 0, default: 0});
GProfileEditorRegistryList.push({fieldname:"Special_CacheNotRefreshedCounter", type:"decimal", controlname:"GSpecial_CacheNotRefreshedCounter", controltype:"variable", value: 0, default: 0});

GProfileEditorRegistryList.push({fieldname:"UsePascalScript", type:"boolean", controlname:"GUsePascalScript", controltype:"variable", default: false});
GProfileEditorRegistryList.push({fieldname:"PascalScript", type:"string", controlname:"GPascalScript", controltype:"variable", default: false});

var do_sync_operationmode_description =
 function(option)
 {
   var log = $('#sync_operationmode_description').find('div');//span
      log.remove();

   if (option == "Standard_Copying_Mode")
   {
       $("#sync_operationmode_description").prepend('<div><span>Standard Copying will copy new, missing, or modified files, but it will not delete any files.<br/><br/></span></div>');
       $("#CopyModeConfigBtn").jqxButton({ height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue', disabled: true });
   }
   else if (option == "SmartTracking_Mode" )
   {
       $("#sync_operationmode_description").prepend('<div><span>SmartTracking is mostly used for two-way synchronization. It can detect<br/>deleted and conflicting files and must be configured to your requirements.</span></div>');
       $("#CopyModeConfigBtn").jqxButton({ height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue', disabled: false });
   }
   else if (option == "Exact_Mirror_Mode" )
   {
       $("#sync_operationmode_description").prepend('<div><span>Exact Mirror will copy and delete files as needed to create an exact mirror. To enable deletions<br/>permission must be given below. see: Safety->Unattended Mode.</span></div>');
       $("#CopyModeConfigBtn").jqxButton({ height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue', disabled: false });
   }
   else if (option == "Move_Files_Mode" )
   {
       $("#sync_operationmode_description").prepend('<div><span>Move Files To Destination will move the files and delete them from the source side.<br/><br/></span></div>');
       $("#CopyModeConfigBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue', disabled: false });
   }
}

var inFTPSchange=false;

function FTP_secure_onchange(event)
{
   if (!event)
      return;
   if (!event.args)
      return;
   if (inFTPSchange)
      return;

   inFTPSchange=true;
   var checked = event.args.checked;

   if (!checked)
      $("#rbFTPSnone").jqxRadioButton('check');
   else
      if ($("#rbFTPSnone").jqxRadioButton('checked'))
         $("#rbFTPSexplicit").jqxRadioButton('check');
   inFTPSchange=false;
}


function FTPSchange(event)
{
  if (inFTPSchange)
     return;

  inFTPSchange=true;
  if ($("#rbFTPSnone").jqxRadioButton('checked'))
     SetCheckBoxValue("cbFTP_secure",false);
  else
     SetCheckBoxValue("cbFTP_secure",true);
  inFTPSchange=false;
}

var GInternetProtocolRadioButtonsList = new Array();
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTPSnone", controltype:"jqxRadioButton", RadioGroupName:"FTP_Security_Mode_Group", ControlAppGroup:"FTP", OnChange: FTPSchange});
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTPSimplicit", controltype:"jqxRadioButton", RadioGroupName:"FTP_Security_Mode_Group", ControlAppGroup:"FTP", OnChange: FTPSchange});
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTPSexplicit", controltype:"jqxRadioButton", RadioGroupName:"FTP_Security_Mode_Group", ControlAppGroup:"FTP", OnChange: FTPSchange});

GInternetProtocolRadioButtonsList.push({    controlname:"rbFTP_Security_auto", controltype:"jqxRadioButton", RadioGroupName:"FTP_Auth_Cmd_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTP_Security_TLS", controltype:"jqxRadioButton", RadioGroupName:"FTP_Auth_Cmd_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTP_Security_SSL", controltype:"jqxRadioButton", RadioGroupName:"FTP_Auth_Cmd_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTP_Security_TLSC", controltype:"jqxRadioButton", RadioGroupName:"FTP_Auth_Cmd_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbFTP_Security_TLSP", controltype:"jqxRadioButton", RadioGroupName:"FTP_Auth_Cmd_Group", ControlAppGroup:"FTP" });

GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS11plus", controltype:"jqxRadioButton", RadioGroupName:"FTP_Version_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS12plus", controltype:"jqxRadioButton", RadioGroupName:"FTP_Version_Group", ControlAppGroup:"FTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS13plus", controltype:"jqxRadioButton", RadioGroupName:"FTP_Version_Group", ControlAppGroup:"FTP" });


GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS11plus", controltype:"jqxRadioButton", RadioGroupName:"HTTP_Version_Group", ControlAppGroup:"HTTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS12plus", controltype:"jqxRadioButton", RadioGroupName:"HTTP_Version_Group", ControlAppGroup:"HTTP" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS13plus", controltype:"jqxRadioButton", RadioGroupName:"HTTP_Version_Group", ControlAppGroup:"HTTP" });

GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS11plus", controltype:"jqxRadioButton", RadioGroupName:"WebDAV_Version_Group", ControlAppGroup:"WebDAV" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS12plus", controltype:"jqxRadioButton", RadioGroupName:"WebDAV_Version_Group", ControlAppGroup:"WebDAV" });
GInternetProtocolRadioButtonsList.push({    controlname:"ftpTLS13plus", controltype:"jqxRadioButton", RadioGroupName:"WebDAV_Version_Group", ControlAppGroup:"WebDAV" });

var GInternetProtocolSetRegistryList =  new Array();

// internet_protocol_settings

if (GisSyncoveryWindows)
   GInternetProtocolSetRegistryList.push({fieldname:"LibraryComboIndex", type:"number", controlname:"jqxLibraryCombo", controltype:"jqxDropDownList", default: "3", width: 150, height: 25, ComboSource : ['1', '2', '3 (default)'], ControlAppGroup: "FTP"});
else
   GInternetProtocolSetRegistryList.push({fieldname:"LibraryComboIndex", type:"number", controlname:"jqxLibraryCombo", controltype:"jqxDropDownList", default: "1", width: 150, height: 25, ComboSource : ['1', '2'], ControlAppGroup: "FTP"});

GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"FTP_url", controltype:"jqxInput", default: "ftp://",  width: 350, height: 25, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"port", type:"decimal", controlname:"FTP_port", controltype:"jqxFormattedInput", spinButtons:  true, default: 21, value: 21, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"passive_mode", type:"boolean", controlname:"cbFTP_passive_mode", controltype:"jqxCheckBox", default: true, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"absolutepath", type:"boolean", controlname:"GIntProtAbsolutePath", controltype:"variable", default: false, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"FTP_login", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, height: 25, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_CharsetComboIndex", type:"number", controlname:"comboFTP_adv_Charset", controltype:"jqxDropDownList", default: "0",  width: 250, height: 25, ComboSource : ['Automatic', 'Unicode (UTF-8)', 'Windows ANSI', 'OS Default 8-Bit'], ControlAppGroup: "FTP"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_ascii_transfer_mode", type:"boolean", controlname:"cbFTP_adv_ascii_transfer_mode", controltype:"jqxCheckBox", default: false, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_server_supports_moving", type:"boolean", controlname:"cbFTP_adv_server_supports_moving", controltype:"jqxCheckBox", default: false, ControlAppGroup: "FTP"});            //'LIST(basic listing)'
GInternetProtocolSetRegistryList.push({fieldname:"adv_ListingCommandComboIndex", type:"number", controlname:"comboFTP_adv_ListingCommand", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
      ComboSource : [ 'Automatic', 'LIST -al (includes hidden files)', 'LIST -alR (recursive listing)', 'LS -al (rare)', 'LS -alR (rare)', 'MLSD' ], ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_verify_file", type:"boolean", controlname:"cbFTP_adv_verify_file", controltype:"jqxCheckBox", default: true, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_respect_passive_mode", type:"boolean", controlname:"cbFTP_adv_respect_passive_mode", controltype:"jqxCheckBox", default: false, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_TimestampsForUploadsComboIndex", type:"number", controlname:"comboFTP_adv_TimestampsForUploads", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px', ComboSource : ['Auto-Detect If Settable', 'Force Sending Timestamps'], ControlAppGroup: "FTP"});

function EnableDisableFTPControls()
{
   var Lautoval = GetCheckBoxValue("cbFTP_autozone");
   // disable detailed fields if time zone is automatic
   DisableCheckBox("cbFTP_UTC",Lautoval);
   $("#FTP_adv_list").jqxFormattedInput( 'disabled', Lautoval);
   $("#FTP_adv_upload_min").jqxFormattedInput( 'disabled', Lautoval);
};

GInternetProtocolSetRegistryList.push({fieldname:"autozone", type:"boolean", controlname:"cbFTP_autozone", controltype:"jqxCheckBox", default: true, ControlAppGroup: "FTP",
               OnChange: function(){EnableDisableControls();}});
GInternetProtocolSetRegistryList.push({fieldname:"UTC", type:"boolean", controlname:"cbFTP_UTC", controltype:"jqxCheckBox", default: true, ControlAppGroup: "FTP"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_list", type:"decimal", controlname:"FTP_adv_list", controltype:"jqxFormattedInput", spinButtons:  true, default: "0", ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_upload_min", type:"decimal", controlname:"FTP_adv_upload_min", controltype:"jqxFormattedInput", spinButtons:  true, default: "0", ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
     ComboSource : ['No Proxy (default)', 'USER user@hostname', 'SITE (with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'], ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_send_host_command", type:"boolean", controlname:"cbFTP_proxy_send_host_command", controltype:"jqxCheckBox", default: false, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"Security_Mode_Group", type:"string", controlname:"FTP_Security_Mode_Group", controltype:"ButtonGroup", default: "rbFTPSexplicit", ControlAppGroup: "FTP",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbFTPSnone"),  $("#rbFTPSimplicit"), $("#rbFTPSexplicit"), null, null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option,   $("#rbFTPSnone"),  $("#rbFTPSimplicit"), $("#rbFTPSexplicit"), null, null, null );

}});

GInternetProtocolSetRegistryList.push({fieldname:"Auth_Cmd_Group", type:"string", controlname:"FTP_Auth_Cmd_Group", controltype:"ButtonGroup", default: "rbFTP_Security_auto", ControlAppGroup: "FTP",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbFTP_Security_auto"),  $("#rbFTP_Security_TLS"), $("#rbFTP_Security_SSL"), $("#rbFTP_Security_TLSC"), $("#rbFTP_Security_TLSP"), null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option,   $("#rbFTP_Security_auto"),  $("#rbFTP_Security_TLS"), $("#rbFTP_Security_SSL"), $("#rbFTP_Security_TLSC"), $("#rbFTP_Security_TLSP"), null );

}});

GInternetProtocolSetRegistryList.push({fieldname:"Version_Group", type:"string", controlname:"FTP_Version_Group", controltype:"ButtonGroup", default: "ftpTLS12plus", ControlAppGroup: "FTP",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#ftpTLS11plus"),  $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option,   $("#ftpTLS11plus"),  $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );

}});

GInternetProtocolSetRegistryList.push({fieldname:"security_CertificateComboIndex", type:"number", controlname:"comboFTP_security_Certificate", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px', ComboSource : [], ControlAppGroup: "FTP",

 OnLoadComboSource : function(RegistryItem)
 {

   if (Gcertificate_names!='')
      RegistryItem.ComboSource = ("none\n"+Gcertificate_names).split('\n');

 }
});

GInternetProtocolSetRegistryList.push({fieldname:"security_CertificatePassword", type:"string", controlname:"FTP_security_CertificatePassword", controltype:"jqxPasswordInput", default: "", height: 25, ControlAppGroup: "FTP"});
GInternetProtocolSetRegistryList.push({fieldname:"security_nopassword", type:"boolean", controlname:"cbFTP_security_nopassword", controltype:"jqxCheckBox", default: false, ControlAppGroup: "FTP"});

// SMB
GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"SMB_url", controltype:"jqxInput", default: "ftp://",  width: 350, height: 25, ControlAppGroup: "SMB"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "SMB"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"inptUsername", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "SMB"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, height: 25, ControlAppGroup: "SMB"});

///GDrive
GInternetProtocolSetRegistryList.push({fieldname:"container", type:"string", controlname:"Container", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"inptAccountID", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"create_links", type:"boolean", controlname:"cbGDrive_create_links", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_enable_doc_convercion", type:"boolean", controlname:"cbGDrive_adv_enable_doc_convercion", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});

GInternetProtocolSetRegistryList.push({fieldname:"clenup_in_folder", type:"boolean", controlname:"cbGDrive_clenup_in_folder", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: 0,  width: '250', height: '25px', ComboSource : ['No Proxy (default)', 'Use Proxy'], ControlAppGroup: "Google Drive"});

GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Spread_xlsx", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Spreads_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Spread_csv", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Spreads_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Spread_pdf", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Spreads_Group", ControlAppGroup:"Google Drive" });


GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_docx", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_odt", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_rtf", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_html", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_pdf", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_TextDocs_txt", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Docs_Group", ControlAppGroup:"Google Drive" });



GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Pres_pptx", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Pres_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Pres_pdf", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Pres_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Pres_txt", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Pres_Group", ControlAppGroup:"Google Drive" });


GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Draw_jpg", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Draw_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Draw_png", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Draw_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Draw_pdf", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Draw_Group", ControlAppGroup:"Google Drive" });
GInternetProtocolRadioButtonsList.push({    controlname:"rbGDocs_Draw_xml", controltype:"jqxRadioButton", RadioGroupName:"GDocs_Draw_Group", ControlAppGroup:"Google Drive" });

GInternetProtocolSetRegistryList.push({fieldname:"GDocs_Spreads_Group", type:"string", controlname:"GDocs_Spreads_Group", controltype:"ButtonGroup",
                                       default: "rbGDocs_Spread_xlsx", ControlAppGroup: "Google Drive",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbGDocs_Spread_xlsx"),  $("#rbGDocs_Spread_csv"), $("#rbGDocs_Spread_pdf"), null, null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option, $("#rbGDocs_Spread_xlsx"),  $("#rbGDocs_Spread_csv"), $("#rbGDocs_Spread_pdf"), null, null, null );
}});

GInternetProtocolSetRegistryList.push({fieldname:"GDocs_TextDocs_Group", type:"string", controlname:"GDocs_Docs_Group", controltype:"ButtonGroup", default: "rbGDocs_TextDocs_docx", ControlAppGroup: "Google Drive",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbGDocs_TextDocs_docx"),  $("#rbGDocs_TextDocs_odt"), $("#rbGDocs_TextDocs_rtf"), $("#rbGDocs_TextDocs_html"), $("#rbGDocs_TextDocs_pdf"),  $("#rbGDocs_TextDocs_txt") );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option, $("#rbGDocs_TextDocs_docx"),  $("#rbGDocs_TextDocs_odt"), $("#rbGDocs_TextDocs_rtf"), $("#rbGDocs_TextDocs_html"), $("#rbGDocs_TextDocs_pdf"),  $("#rbGDocs_TextDocs_txt") );

}});

GInternetProtocolSetRegistryList.push({fieldname:"GDocs_Pres_Group", type:"string", controlname:"GDocs_Pres_Group", controltype:"ButtonGroup", default: "rbGDocs_Pres_pptx", ControlAppGroup: "Google Drive",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbGDocs_Pres_pptx"),  $("#rbGDocs_Pres_pdf"), $("#rbGDocs_Pres_txt"), null, null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option, $("#rbGDocs_Pres_pptx"),  $("#rbGDocs_Pres_pdf"), $("#rbGDocs_Pres_txt"), null, null, null );

}});

GInternetProtocolSetRegistryList.push({fieldname:"GDocs_Draw_Group", type:"string", controlname:"GDocs_Draw_Group", controltype:"ButtonGroup", default: "rbGDocs_Draw_jpg", ControlAppGroup: "Google Drive",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#rbGDocs_Draw_jpg"),  $("#rbGDocs_Draw_png"), $("#rbGDocs_Draw_pdf"), $("#rbGDocs_Draw_xml"), null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option, $("#rbGDocs_Draw_jpg"),  $("#rbGDocs_Draw_png"), $("#rbGDocs_Draw_pdf"), $("#rbGDocs_Draw_xml"), null, null);

}});

GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_csv", type:"boolean", controlname:"cbGDocs_ftconvert_csv", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_html", type:"boolean", controlname:"cbGDocs_ftconvert_html", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_pdf", type:"boolean", controlname:"cbGDocs_ftconvert_pdf", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_pptx", type:"boolean", controlname:"cbGDocs_ftconvert_pptx", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_txt", type:"boolean", controlname:"cbGDocs_ftconvert_txt", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_doc", type:"boolean", controlname:"cbGDocs_ftconvert_doc", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_ods", type:"boolean", controlname:"cbGDocs_ftconvert_ods", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_pps", type:"boolean", controlname:"cbGDocs_ftconvert_pps", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_rtf", type:"boolean", controlname:"cbGDocs_ftconvert_rtf", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_xls", type:"boolean", controlname:"cbGDocs_ftconvert_xls", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_docx", type:"boolean", controlname:"cbGDocs_ftconvert_docx", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_odt", type:"boolean", controlname:"cbGDocs_ftconvert_odt", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_ppt", type:"boolean", controlname:"cbGDocs_ftconvert_ppt", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_tsv", type:"boolean", controlname:"cbGDocs_ftconvert_tsv", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});
GInternetProtocolSetRegistryList.push({fieldname:"GDocs_uploadconvert_xlsx", type:"boolean", controlname:"cbGDocs_ftconvert_xlsx", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Google Drive"});

GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"HTTP_url", controltype:"jqxInput", default: "https://",  width: 350, height: 25, value: "", ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"port", type:"decimal", controlname:"HTTP_port", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"HTTP_login", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_download_and_parse", type:"boolean", controlname:"cbHTTP_HTML_download_and_parse", controltype:"jqxCheckBox", default: false, width:400, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_parsing_limit", type:"decimal", controlname:"HTTP_HTML_parsing_limit", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_enquire_timestamp", type:"boolean", controlname:"cbHTTP_HTML_enquire_timestamp", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_enquire_precise_info", type:"boolean", controlname:"cbHTTP_HTML_enquire_precise_info", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_download_default_pages", type:"boolean", controlname:"cbHTTP_HTML_download_default_pages", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_consider_locally_existing_files", type:"boolean", controlname:"cbHTTP_HTML_consider_locally_existing_files", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_assume_local_files", type:"boolean", controlname:"cbHTTP_HTML_assume_local_files", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_avoid_re_downloading", type:"boolean", controlname:"cbHTTP_HTML_avoid_re_downloading", controltype:"jqxCheckBox", default: false, ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_LinksAboveComboIndex", type:"number", controlname:"jqxLinksAboveCombo", controltype:"jqxDropDownList", default: false,   width: 200, height: 25, ComboSource : ['Ignore', 'Download', 'Download&Analyze'], ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"HTML_LinksToOtherDomainsComboIndex", type:"number", controlname:"jqxLinksToOtherDomainsCombo", controltype:"jqxDropDownList", default: false, width: 200, height: 25, ComboSource : ['Ignore', 'Download', 'Download&Analyze'], ControlAppGroup: "HTTP"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_http_retries", type:"decimal", controlname:"HTTP_adv_http_retries", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "HTTP"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: 0, width: '250', height: '25px', ComboSource : ['No Proxy (default)', 'Auto Detect', 'Basic Authentication'], ControlAppGroup: "HTTP"});

GInternetProtocolSetRegistryList.push({fieldname:"Version_Group", type:"string", controlname:"Version_Group", controltype:"ButtonGroup", default: "ftpTLS12plus", ControlAppGroup: "HTTP",
getfunc: function()
{
   return GetCheckedRadiobuttonName( $("#ftpTLS11plus"),  $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );

}, setfunc: function( option )
{
     SetRadioGroupChecked(option, $("#ftpTLS11plus"),  $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );

}});

// Amazon S3

GInternetProtocolSetRegistryList.push({fieldname:"bucket", type:"string", controlname:"AmazonS3_bucket", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"reduced_redundancy", type:"number", controlname:"comboS3StorageClass", controltype:"jqxDropDownList", default: "0", width: 200,
   ComboSource : ['Standard Storage Class', 'Reduced Redundancy', 'Infrequent Access', 'One Zone IA', 'Glacier', 'Intelligent Tiering', 'Glacier Deep Archive'],
   ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"AmazonS3_access_id", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"use_transfer_acceleration", type:"boolean", controlname:"cbAmazonS3_use_transfer_acceleration", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Amazon S3"});

GInternetProtocolSetRegistryList.push({fieldname:"make_uploaded_files_pub_available", type:"boolean", controlname:"cbAmazonS3_make_uploaded_files_pub_available", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Amazon S3"});
GInternetProtocolSetRegistryList.push({fieldname:"use_server_side_encryption", type:"boolean", controlname:"cbAmazonS3_use_server_side_encryption", controltype:"jqxCheckBox", default: false, ControlAppGroup: "Amazon S3"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
      ComboSource : ['No Proxy (default)', 'Use Proxy' ], ControlAppGroup: "Amazon S3"});

GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "Azure"});
GInternetProtocolSetRegistryList.push({fieldname:"container", type:"string", controlname:"Azure_container", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Azure"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"Azure_account_id", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Azure"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, ControlAppGroup: "Azure"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_cache_control", type:"decimal", controlname:"Azure_adv_cache_control", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "Azure"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
    ComboSource : ['No Proxy (default)', 'Use Proxy'], ControlAppGroup: "Azure"});

// SHAREPOINT

GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Sharepoint"});
GInternetProtocolSetRegistryList.push({fieldname:"domain", type:"string", controlname:"Sharepoint_domain", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Sharepoint"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"Sharepoint_account_id", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Sharepoint"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
     ComboSource : ['No Proxy (default)', 'Use Proxy'], ControlAppGroup: "Sharepoint"});

// WEBDAV
GInternetProtocolSetRegistryList.push({fieldname:"LibraryComboIndex", type:"number", controlname:"jqxLibraryCombo", controltype:"jqxDropDownList", default: "0", width: 150, height: 25, ComboSource : ['1 (OpenSSL)', '2 (SBB SSL)'], ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"WebDAV_url", controltype:"jqxInput", default: "https://", value: "http://",  width: 350, height: 25, ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"AuthenticationComboIndex", type:"number", controlname:"jqxWebDAVAuthenticationCombo", controltype:"jqxDropDownList", default: "0", width: 100, height: 25, ComboSource : [ 'Auto', 'Basic', 'NTLM', 'Digest'], ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"WebDAV_login", controltype:"jqxInput", default: "",  width: 350, height: 25, ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, height: 25, ControlAppGroup: "WebDAV"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_CharsetComboIndex", type:"number", controlname:"comboWebDAV_adv_Charset", controltype:"jqxDropDownList", default: "0", width: 150, height: 25, ComboSource : ['Automatic', 'Unicode (UTF-8)', 'Windows ANSI', 'OS Default 8-Bit' ], ControlAppGroup: "WebDAV"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_strategyCombo", type:"number", controlname:"comboWebDAV_adv_strategyCombo", controltype:"jqxDropDownList", default: "0", width: 250, height: 25, ComboSource : ['Get All Properties', 'Get Necessary Properties Only', 'PROPFIND without XML body' ], ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_use_displayname", type:"boolean", controlname:"cbWebDAV_adv_use_displayname", controltype:"jqxCheckBox", default: false, ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_use_expect_100_continue", type:"boolean", controlname:"comboWebDAV_adv_use_expect_100_continue", controltype:"jqxCheckBox", default: false, ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_TimestampsForUploads", type:"number", controlname:"comboWebDAV_adv_TimestampsForUploads", controltype:"jqxDropDownList", default: "0",  width: 200, height: 25, ComboSource : ['Auto-Detect If Settable', 'WebDrive/GroupDrive', 'CrushFTP', 'OnlineDrive by CM4all' ], ControlAppGroup: "WebDAV"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_http_retries", type:"decimal", controlname:"WebDAV_adv_http_retries", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "WebDAV"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0",  width: 250, height: 25,
     ComboSource : ['No Proxy (default)', 'Auto Detect', 'Basic Authentication'], ControlAppGroup: "WebDAV"});

 GInternetProtocolSetRegistryList.push({fieldname:"WebDAV_Version_Group", type:"string", controlname:"WebDAV_Version_GroupWidget", controltype:"ButtonGroup",
                 default: "ftpTLS12plus", ControlAppGroup: "WebDAV",
 getfunc: function()
 {
    return GetCheckedRadiobuttonName( $("#ftpTLS11plus"), $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );

 }, setfunc: function( option )
 {
      SetRadioGroupChecked(option, $("#ftpTLS11plus"), $("#ftpTLS12plus"), $("#ftpTLS13plus"), null, null );
 }});

GInternetProtocolSetRegistryList.push({fieldname:"LibraryComboIndex", type:"number", controlname:"jqxLibraryCombo", controltype:"jqxDropDownList", default: "0", width: 100, height: 25, ComboSource : ['1 (SSH)', '2 (Direct)'], ControlAppGroup: "RSync"});
GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"Rsync_url", controltype:"jqxInput", default: "rsync://", value: "rsync://", width: 250, ControlAppGroup: "RSync"});
GInternetProtocolSetRegistryList.push({fieldname:"port", type:"decimal", controlname:"Rsync_port_number", controltype:"jqxFormattedInput", spinButtons:  true,default: "22", ControlAppGroup: "RSync"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", ControlAppGroup: "RSync"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"Rsync_login", controltype:"jqxInput", default: "", ControlAppGroup: "RSync"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", ControlAppGroup: "RSync"});

GInternetProtocolSetRegistryList.push({fieldname:"LibraryComboIndex", type:"number", controlname:"jqxLibraryCombo", controltype:"jqxDropDownList", default: "0", width: 120, height: 25, ComboSource : ['1 (SFTP)', '2 (SCP)', '3 (Pure SSH)' ], ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"url", type:"string", controlname:"SSH_url", controltype:"jqxInput", width: 350, height: 25, default: "sftp://", value: "sftp://", ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"port", type:"decimal", controlname:"SSH_port", controltype:"jqxFormattedInput", spinButtons:  true,default: 22, value: 22, height: 25, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"absolutepath", type:"boolean", controlname:"GIntProtAbsolutePath", controltype:"variable", default: false, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"SSH_login", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, height: 25, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"usePutty", type:"boolean", controlname:"cbSSH_usePutty", controltype:"jqxCheckBox", default: true, ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"adv_CharsetComboIndex", type:"number", controlname:"comboSSH_adv_Charset", controltype:"jqxDropDownList", default: "0", width: 250, height: 25, ComboSource : ['Automatic', 'Unicode (UTF-8)', 'Windows ANSI', 'OS Default 8-Bit'], ControlAppGroup: "SSH"});



GInternetProtocolSetRegistryList.push({fieldname:"adv_verify_destination_file", type:"boolean", controlname:"cbSSH_adv_verify_destination_file", controltype:"jqxCheckBox", default: true, ControlAppGroup: "SSH"});

function EnableDisableSSHControls()
 {
    var Lautoval = GetCheckBoxValue("cbSSH_autozone");
    // disable detailed fields if time zone is automatic
    DisableCheckBox("cbSSH_UTC",Lautoval);
    $("#SSH_adv_list").jqxFormattedInput( 'disabled', Lautoval);
    $("#SSH_adv_upload_min").jqxFormattedInput( 'disabled', Lautoval);
 };
GInternetProtocolSetRegistryList.push({fieldname:"autozone", type:"boolean", controlname:"cbSSH_autozone", controltype:"jqxCheckBox", default: true, ControlAppGroup: "SSH",
   OnChange : function(){EnableDisableControls();} });
GInternetProtocolSetRegistryList.push({fieldname:"UTC", type:"boolean", controlname:"cbSSH_UTC", controltype:"jqxCheckBox", default: true, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_list", type:"decimal", controlname:"SSH_adv_list", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_upload_min", type:"decimal", controlname:"SSH_adv_upload_min", controltype:"jqxFormattedInput", spinButtons:  true,default: "0", ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: 250, height: 25,
    ComboSource : ['No Proxy (default)', 'Use Web Tunneling', 'Use SOCKS 4', 'Use SOCKS 5'], ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"Security_username_password", type:"boolean", controlname:"cbSSH_Security_username_password", controltype:"jqxCheckBox", default: false, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"Security_keyboard", type:"boolean", controlname:"cbSSH_Security_keyboard", controltype:"jqxCheckBox", default: false, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"Security_certificate", type:"boolean", controlname:"cbSSH_Security_certificate", controltype:"jqxCheckBox", default: false, ControlAppGroup: "SSH"});


GInternetProtocolSetRegistryList.push({fieldname:"security_CertificateComboIndex", type:"number", controlname:"comboSSH_security_Certificate", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px', ComboSource : [], ControlAppGroup: "SSH",

  OnLoadComboSource : function(RegistryItem)
  {

    if (Gcertificate_names!='')
       RegistryItem.ComboSource = ("none\n"+Gcertificate_names).split('\n');

  }
});

GInternetProtocolSetRegistryList.push({fieldname:"security_CertificatePassword", type:"string", controlname:"SSH_security_CertificatePassword", controltype:"jqxPasswordInput", default: "", height: 25, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"security_nopassword", type:"boolean", controlname:"cbSSH_security_nopassword", controltype:"jqxCheckBox", default: false, ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"Vault", type:"string", controlname:"Glacier_Vault", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Glacier"});
GInternetProtocolSetRegistryList.push({fieldname:"RegionComboIndex", type:"number", controlname:"comboGlacier_Region", controltype:"jqxDropDownList", default: "0",  width: '250', height: '25px',
     ComboSource : ['US East (Northern Virginia)',
                    'US West (Oregon)',
                    'US West (Northern California)',
                    'EU (Ireland)',
                    'Asia Pacific (Tokyo)',
                    'US East (Ohio)',
                    'Canada (Central)',
                    'Asia Pacific (Mumbai)',
                    'Asia Pacific (Soeul)',
                    'Asia Pacific (Sydney)',
                    'EU (Frankfurt)',
                    'EU (London)'
                    ],
     ControlAppGroup: "Glacier"});
GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Glacier"});
GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"inpt_Glacier_account_id", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "Glacier"});
GInternetProtocolSetRegistryList.push({fieldname:"Password", type:"string", controlname:"inptPassword", controltype:"jqxPasswordInput", default: "", width: 350, ControlAppGroup: "Glacier"});

GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: "0", width: '250', height: '25px',
    ComboSource : ['No Proxy (default)', 'Use Proxy'], ControlAppGroup: "Glacier"});

 // GDriveAlike

 GInternetProtocolSetRegistryList.push({fieldname:"container", type:"string", controlname:"Container", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "GDriveAlike"});
 GInternetProtocolSetRegistryList.push({fieldname:"InternetFolder", type:"string", controlname:"inptInternetFolder", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "GDriveAlike"});
 GInternetProtocolSetRegistryList.push({fieldname:"login", type:"string", controlname:"inptAccountID", controltype:"jqxInput", default: "", width: 350, ControlAppGroup: "GDriveAlike"});

 GInternetProtocolSetRegistryList.push({fieldname:"proxy_type", type:"number", controlname:"comboproxy_type", controltype:"jqxDropDownList", default: 0,  width: 250, height: 25, ComboSource : ['No Proxy (default)', 'Use Proxy'], ControlAppGroup: "GDriveAlike"});

GInternetProtocolSetRegistryList.push({fieldname:"EncryptionAlgorithms", type:"string", controlname:"G_SSH_EncryptionAlgorithms", controltype:"variable", default: "", value: "", ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"PublicKeyAlgorithms", type:"string", controlname:"G_SSH_PublicKeyAlgorithms", controltype:"variable", default: "", value: "", ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"MACAlgorithms", type:"string", controlname:"G_SSH_MACAlgorithms", controltype:"variable", default: "", value: "", ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"KeyExchangeAlgorithms", type:"string", controlname:"G_SSH_KeyExchangeAlgorithms", controltype:"variable", default: "", value: "", ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"SFTPVersionSet", type:"string", controlname:"G_SSH_SFTPVersionSet", controltype:"variable", default: "", value: "", ControlAppGroup: "SSH"});

GInternetProtocolSetRegistryList.push({fieldname:"CompressionLevel", type:"decimal", controlname:"GCompressionLevel_SSH", controltype:"variable", default: 1, value: 1, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"AutoAdjustCiphers", type:"boolean", controlname:"G_SSH_AutoAdjustCiphers", controltype:"variable", default: false, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"AutoAdjustTransferBlock", type:"boolean", controlname:"G_SSH_AutoAdjustTransferBlock", controltype:"variable", default: false, ControlAppGroup: "SSH"});


GInternetProtocolSetRegistryList.push({fieldname:"DownloadBlockSize", type:"decimal", controlname:"G_SSH_DownloadBlockSize", controltype:"variable", default: 1, value: 1, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"UploadBlockSize", type:"decimal", controlname:"G_SSH_UploadBlockSize", controltype:"variable", default: 1, value: 1, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"SFTPBufferSize", type:"decimal", controlname:"G_SSH_SFTPBufferSize", controltype:"variable", default: 1, value: 1, ControlAppGroup: "SSH"});
GInternetProtocolSetRegistryList.push({fieldname:"PipelineLength", type:"decimal", controlname:"G_SSH_PipelineLength", controltype:"variable", default: 1, value: 1, ControlAppGroup: "SSH"});

// A few common parameters
GInternetProtocolSetRegistryList.push({fieldname:"timeout", type:"decimal", controlname:"adv_timeout", controltype:"jqxFormattedInput", spinButtons:  true, default: "60", ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"retries", type:"decimal", controlname:"adv_retries", controltype:"jqxFormattedInput", spinButtons:  true, default: "2", ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"recursive_listing", type:"boolean", controlname:"cbrecursive_listing", controltype:"jqxCheckBox", default: true, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"AvoidChangesAPIInitialListing", type:"boolean", controlname:"cbAvoidChangesAPIInitialListing", controltype:"jqxCheckBox", default: true, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"allow_ipv6", type:"boolean", controlname:"cballow_ipv6", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_host", type:"string", controlname:"proxy_host", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_port", type:"number", controlname:"proxy_port", controltype:"jqxFormattedInput", spinButtons:  true,default: 0, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_login", type:"string", controlname:"proxy_login", controltype:"jqxInput", default: "", width: 350, height: 25, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"proxy_password", type:"string", controlname:"proxy_password", controltype:"jqxPasswordInput", default: "", width: 350, height: 25, ControlAppGroup: "*"});

// replace characters
GInternetProtocolSetRegistryList.push({fieldname:"adv_replace_characters", type:"boolean", controlname:"cbadv_replace_characters", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*",
   OnChange: OnAdv_replace_charactersCb});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbReplaceColons", type:"boolean", controlname:"cbReplaceColons", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbUploadUpperCase", type:"boolean", controlname:"cbUploadUpperCase", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbUploadLowerCase", type:"boolean", controlname:"cbUploadLowerCase", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbAutomatic", type:"boolean", controlname:"cbAutomatic", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbAutomaticWinCompatible", type:"boolean", controlname:"cbAutomaticWinCompatible", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_cbCustomReplacements", type:"boolean", controlname:"cbCustomReplacements", controltype:"jqxCheckBox", default: false, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_CustomReplacementsOtherSide", type:"string", controlname:"memLocal", controltype:"jqxInput", default: "", width: 150, height: 200, ControlAppGroup: "*"});
GInternetProtocolSetRegistryList.push({fieldname:"adv_CustomReplacementsServerSide", type:"string", controlname:"memServer", controltype:"jqxInput", default: "", width: 150, height: 200, ControlAppGroup: "*"});

var indexOfListLoaded = GInternetProtocolSetRegistryList.push({ListLoaded:false}) -1;
var indexOfListChanged = GInternetProtocolSetRegistryList.push({ListChanged:false}) -1;
  
function PostProfileEditor(CurrentProfile, CurrentProfileAction, FunctionToCallAfterSave)
{
  try
  {
     if (!GIsmobileApplication)
     {
       SetSmartTrackingGlobalVariablesFromFilesTab();
     }
     else
     {
       m_SetSmartTrackingGlobalVariablesFromFilesTab();
     }

     ControlValuesToRegistryList( GProfileEditorRegistryList, "" );

     PostRegistryListSettings( GProfileEditorRegistryList,  CurrentProfile, CurrentProfileAction, "synapp_profile_editor_form", "" ).done(
       function( data )
       {
          if ((data!='Edited') && (data!='Inserted'))
          {
             alert(data);
             return;
          }

          var ForBrowsing = (CurrentProfileAction=="Browse");

          var ActionForFTP;

          if (ForBrowsing)
             ActionForFTP = CurrentProfileAction;
          else
             ActionForFTP = "Edit";

          if ((GInternetProtocolSetLEFTRegistryList.length > 0) &&
              (GInternetProtocolSetLEFTRegistryList[indexOfListChanged].ListChanged ||
               ForBrowsing && (GInternetProtocolSetLEFTRegistryList[0].value!=null)) &&
              (GLeftProtocolName != undefined ) &&
              (GLeftProtocolName != ""))
              PostRegistryListSettings( GInternetProtocolSetLEFTRegistryList,  CurrentProfile,
                         ActionForFTP, "internet_settings_LEFT_" + GLeftProtocolName, GetBaseProtocolName(GLeftProtocolName)).done(
                function( data )
                {
                  AfterFirstIPPost();
                });
          else
             AfterFirstIPPost();

          function AfterFirstIPPost()
          {
          if ((GInternetProtocolSetRIGHTRegistryList.length > 0) &&
              (GInternetProtocolSetRIGHTRegistryList[indexOfListChanged].ListChanged ||
               ForBrowsing && (GInternetProtocolSetRIGHTRegistryList[0].value!=null)) &&
              (GRightProtocolName != undefined) &&
              (GRightProtocolName != ""))
              PostRegistryListSettings( GInternetProtocolSetRIGHTRegistryList,  CurrentProfile,
                         ActionForFTP, "internet_settings_RIGHT_" + GRightProtocolName, GetBaseProtocolName(GRightProtocolName)).done(
                function( data )
                {
                  AfterAllPosts();
                });
          else
             AfterAllPosts();
          }

          function AfterAllPosts()
          {
            // REFRESH THE GRID
            if (!GIsmobileApplication)
            {
               $("#jqxgrid").jqxGrid( {source: GridDataAdapter});
               // GridDataAdapter.dataBind(); // causes second call to profiles.json
            }

            if (GIsmobileApplication)
            {
              rowDetails = [];
              $('#jqxgrid').jqxGrid({initrowdetails: initrowdetails});
            }
            GProfileListChanged = true;

            if (CurrentProfileAction != "Browse")
               $('#jqxProfileEditorForm').jqxWindow('close');

            if (FunctionToCallAfterSave!=null)
               FunctionToCallAfterSave();
          }
       });

      }
      catch (err)
      {
         var mes = err.message + '  in PostProfileEditor, file '+err.fileName+', line '+err.lineNumber;
         alert(mes);
      }
}

function RegistryListToObject(PRegistryList,AnObject,ControlAppGroup)
{
  for (var index=0; index<PRegistryList.length; index++)
  {
    var RegistryItem = PRegistryList[index];
    if (RegistryItem)
    {
      if ((ControlAppGroup == "") ||
          (RegistryItem.ControlAppGroup == ControlAppGroup) ||
          (RegistryItem.ControlAppGroup == "*") )
         AnObject[RegistryItem.fieldname] = RegistryItem.value;
    }
  };
}


function PostRegistryListSettings( PRegistryList, ProfileName, Action, formname, ControlAppGroup )
{
  var sendparams = { };

  sendparams.ProfileName = ProfileName.trim();
  sendparams.OriginalProfileName = GSelectedProfileName;
  if (sendparams.ProfileName != "***BROWSEDUMMY***")
     GSelectedProfileName =sendparams.ProfileName; // after saving, remember the new name so that other forms are saved with the new name as original name (FTP etc.)
  sendparams.Action = Action;
  sendparams.FormName = formname;
  sendparams.token = GClientToken;
  sendparams.IsmobileApplication = GIsmobileApplication;

  RegistryListToObject(PRegistryList,sendparams,ControlAppGroup);

  var stringified=JSON.stringify(sendparams);
  return $.post( "post_profilesettings.php",  stringified);
}


var ProfileSource =
  {
      datafields: [
          { name: 'Name', type: 'string' },
          { name: 'LeftPath', type: 'string' },
          { name: 'RightPath', type: 'string' },
          { name: 'Progress', type: 'string' }   ,
                      
          { name: 'LTR', type: 'boolean' },
          { name: 'RTL', type: 'boolean' },
          { name: 'UseAdditionalDests', type: 'boolean' },
          { name: 'AddDestATMBehavior', type: 'number' },
          { name: 'AddDestMode', type: 'number' },

          { name: 'IncludeSubfoldersWidget', map: 'IncludeSubfoldersWidget', type: 'string' },
          { name: 'SyncOperationModeWidget', map: 'SyncOperationModeWidget', type: 'string' },
          { name: 'CaseSensitive', map: 'CaseSensitive', type: 'boolean' },
          { name: 'LeftProtocolName', type: 'string' },
          { name: 'RightProtocolName', type: 'string' },
          { name: 'SubfolderSelections', type: 'string' },

          { name: 'SmartTrackingMoveSettingsWidget', type: 'string' },
          { name: 'SmartTrackingDeletedSettingsWidget', type: 'string' },
          { name: 'SmartTrackingConflictingSettingsWidget', type: 'string' },
          { name: 'Smt_DetectUnchangedLeftCb', map: 'Smt_DetectUnchangedLeftCb', type: 'boolean' },
          { name: 'Smt_DetectUnchangedRightCb', map: 'Smt_DetectUnchangedRightCb', type: 'boolean' },
          { name: 'Smt_DetectServerSizeModsCb', map: 'Smt_DetectServerSizeModsCb', type: 'boolean' },
          { name: 'Smt_BothNewConflictCb', map: 'Smt_BothNewConflictCb', type: 'boolean' },
          { name: 'Smt_BothNewConflictCheckArchiveFlagAndTimestampCb', map: 'Smt_BothNewConflictCheckArchiveFlagAndTimestampCb', type: 'boolean' },
          { name: 'Smt_ConflictsAddNumberCb', map: 'Smt_ConflictsAddNumberCb', type: 'boolean' },
          { name: 'Smt_ConflictsAddUserCb', map: 'Smt_ConflictsAddUserCb', type: 'boolean' },
          { name: 'Smt_ConflictsAddTimeCb', map: 'Smt_ConflictsAddTimeCb', type: 'boolean' },
          { name: 'Smt_ConflictsAddDollarCb', map: 'Smt_ConflictsAddDollarCb', type: 'boolean' },
          { name: 'SmartTrackingConflictsIfExistsAddNumberWidget', type: 'string' },
          { name: 'Mrr_ExactMirrorDeletesCb', type: 'boolean' },
          { name: 'Mrr_ExactMirrorOverwritesNewerFilesCb', type: 'boolean' },
          { name: 'Mrr_DelayDeletionsCb', type: 'boolean' },
          { name: 'Mrr_DeleteNonMatchingFiltersCb', type: 'boolean' },
          { name: 'Mrr_DeleteDeselectedCb', type: 'boolean' },
          { name: 'Mrr_DeleteNonMatchingMasksCb', type: 'boolean' },
          { name: 'Mrr_DelayDelDays', type: 'number' },
          { name: 'Mrr_DelayDelHours', type: 'number' },
          { name: 'Mrr_DelayDelMinutes', type: 'number' },
          { name: 'Mrr_OVDelayDelDays', type: 'number' },
          { name: 'Mrr_OVDelayDelHours', type: 'number' },
          { name: 'Mrr_OVDelayDelMinutes', type: 'number' },
          { name: 'Mrr_OVDelayDeletionsCb', type: 'boolean' },

          //move settings
          { name: 'Move_MoveByCopyingCb', type: 'boolean' },
          { name: 'MoveFilesMode', type: 'string' },
                      

          // Tabsheet Schedule/Schedule

          { name: 'ScheduleThisProfile', map: 'ScheduleThisProfile', type: 'boolean' },
          { name: 'ScheduleDays', map: 'ScheduleDays', type: 'decimal' },
          { name: 'ScheduleHours', map: 'ScheduleHours', type: 'decimal' },
          { name: 'ScheduleMinutes', map: 'ScheduleMinutes', type: 'decimal' },
          { name: 'ScheduleSec', map: 'ScheduleSec', type: 'decimal' },
          { name: 'RunModeRadiogroupWidget', map: 'RunModeRadiogroupWidget' },
          { name: 'SpecifyNextRun', map: 'SpecifyNextRun', type: 'boolean' },
          { name: 'IntervalSpecification', map: 'IntervalSpecification', type: 'boolean' },
          { name: 'Run_Every_Day_Time_Input', map: 'Run_Every_Day_Time_Input', type: 'time' },
          { name: 'NextRunDay_Input', map: 'NextRunDay_Input', type: 'date' },
          { name: 'NextRunTime_Input', map: 'NextRunTime_Input', type: 'time' },
          { name: 'IgnoreTimeWindowOnWeekends', map: 'IgnoreTimeWindowOnWeekends', type: 'boolean' },
          { name: 'InterruptMiddleOfFile', map: 'InterruptMiddleOfFile', type: 'boolean' },
          { name: 'StopRunningProfiles', map: 'StopRunningProfiles', type: 'boolean' },
                        


          // Tabsheet Schedule/More

          { name: 'ScheduleRunUponWinLogin', map: 'ScheduleRunUponWinLogin', type: 'boolean' },
          { name: 'ScheduleRunUponShutdownOrReboot', map: 'ScheduleRunUponShutdownOrReboot', type: 'boolean' },
          { name: 'ScheduleRunUponLogOut', map: 'ScheduleRunUponLogOut', type: 'boolean' },
          { name: 'ScheduleWarnIfProfileNotRunFor', map: 'ScheduleWarnIfProfileNotRunFor', type: 'boolean' },
          { name: 'WarnIfProfileNotRunFor_Time_Input', map: 'WarnIfProfileNotRunFor_Time_Input', type: 'decimal' },
          { name: 'ScheduleRunMissedDaylyJob', map: 'ScheduleRunMissedDaylyJob', type: 'boolean' },
          { name: 'ScheduleAddRandomDelayUpTo', map: 'ScheduleAddRandomDelayUpTo', type: 'boolean' },
          { name: 'AddRandomDelay_Time_Input', map: 'AddRandomDelay_Time_Input', type: 'decimal' },
          { name: 'AdditionalTimes_Time_Input1', map: 'AdditionalTimes_Time_Input1', type: 'time' },
          { name: 'AdditionalTimes_Time_Input2', map: 'AdditionalTimes_Time_Input2', type: 'time' },
          { name: 'AdditionalTimes_Time_Input3', map: 'AdditionalTimes_Time_Input3', type: 'time' },
          { name: 'AdditionalTimes_Time_Input4', map: 'AdditionalTimes_Time_Input4', type: 'time' },
          { name: 'UseAdditionalTimes1', map: 'UseAdditionalTimes1', type: 'boolean' },
          { name: 'UseAdditionalTimes2', map: 'UseAdditionalTimes2', type: 'boolean' },
          { name: 'UseAdditionalTimes3', map: 'UseAdditionalTimes3', type: 'boolean' },
          { name: 'UseAdditionalTimes4', map: 'UseAdditionalTimes4', type: 'boolean' },
                      
                      

          // Tabsheet Schedule/Weekdays

          { name: 'Monday', map: 'Monday', type: 'boolean' },
          { name: 'Tuesday', map: 'Tuesday', type: 'boolean' },
          { name: 'Wednesday', map: 'Wednesday', type: 'boolean' },
          { name: 'Thursday', map: 'Thursday', type: 'boolean' },
          { name: 'Friday', map: 'Friday', type: 'boolean' },
          { name: 'Saturday', map: 'Saturday', type: 'boolean' },
          { name: 'Sunday', map: 'Sunday', type: 'boolean' },
          { name: 'RunOnlyBetweenCb', map: 'RunOnlyBetweenCb', type: 'boolean' },
          { name: 'RunOnlyMinTime', map: 'RunOnlyMinTime', type: 'time' },
          { name: 'RunOnlyMaxTime', map: 'RunOnlyMaxTime', type: 'time' },

          // Tabsheet Schedule Monitoring/Realtime

          { name: 'RealTimeSynchronization', map: 'RealTimeSynchronization', type: 'boolean' },
          { name: 'RealContinuousSync', map: 'RealContinuousSync', type: 'boolean' },
          { name: 'RealProfileAsSoonAsDriveAvailable', map: 'RealProfileAsSoonAsDriveAvailable', type: 'boolean' },
                      
          { name: 'RealUseMinimumPause', map: 'RealUseMinimumPause', type: 'boolean' },
          { name: 'Real_MonitoringRunOnlyOnceWidget', map: 'Real_MonitoringRunOnlyOnceWidget', type: 'string' },
          { name: 'RealPauseHours', map: 'RealPauseHours', type: 'number' },
          { name: 'RealPauseMinutes', map: 'RealPauseMinutes', type: 'number' },
          { name: 'RealPauseSeconds', map: 'RealPauseSeconds', type: 'number' },

                      
                    


          // Tabsheet Schedule Monitorin/RealTime -> RealTime Settings
          { name: 'RunCompletelyOnce', map: 'RunCompletelyOnce', type: 'boolean' },
          { name: 'RealtimeFolderMode', map: 'RealtimeFolderMode', type: 'boolean' },
          { name: 'RealTimeDeletions', map: 'RealTimeDeletions', type: 'boolean' },
          { name: 'RealTimeDeletionsSafetyDelay', map: 'RealTimeDeletionsSafetyDelay', type: 'number' },
          { name: 'RealTimeRenames', map: 'RealTimeRenames', type: 'boolean' },
          { name: 'RealTimeIgnoreTempFiles', map: 'RealTimeIgnoreTempFiles', type: 'boolean' },
          { name: 'MonitoringIntervalSeconds', map: 'MonitoringIntervalSeconds', type: 'number' },
          { name: 'MonitoringIntervalMinutes', map: 'MonitoringIntervalMinutes', type: 'number' },


          // Tabsheet Schedule Monitorin/RealTime -> RealTime Settings, advanced.
          { name: 'RealtimeDelaySeconds', map: 'RealtimeDelaySeconds', type: 'number' },
          { name: 'FullRunBasedOnItemCount', map: 'FullRunBasedOnItemCount', type: 'number' },
          { name: 'FullRunBasedOnTimeSeconds', map: 'FullRunBasedOnTimeSeconds', type: 'number' },

          { name: 'RealtimeCheckFTPForChanges', map: 'RealtimeCheckFTPForChanges', type: 'boolean' },
          { name: 'UseFTPChangesTechniqueForLeftSide', map: 'UseFTPChangesTechniqueForLeftSide', type: 'boolean' },
          { name: 'UseFTPChangesTechniqueForRightSide', map: 'UseFTPChangesTechniqueForRightSide', type: 'boolean' },
          { name: 'FTPChangesCheckIntervalSeconds', map: 'FTPChangesCheckIntervalSeconds', type: 'number' },

          // Tabsheet AccessAndRetries/File Access
          { name: 'VolumeShadowingRadiogroupWidget', map: 'VolumeShadowingRadiogroupWidget' },
          { name: 'FADatabaseSafeCopy', map: 'FADatabaseSafeCopy', type: 'boolean' },
          { name: 'FATakeAdminOwnership', map: 'FATakeAdminOwnership', type: 'boolean' },
          { name: 'FAVerifyOpeningPriorCopy', map: 'FAVerifyOpeningPriorCopy', type: 'boolean' },

          { name: 'FAIgnoreAccessDeniedFolders', map: 'FAIgnoreAccessDeniedFolders', type: 'boolean' },
          { name: 'FAIgnoreAccessDeniedFiles', map: 'FAIgnoreAccessDeniedFiles', type: 'boolean' },
          { name: 'FAIgnoreDeletionErrors', map: 'FAIgnoreDeletionErrors', type: 'boolean' },
          { name: 'FAIgnoreDeletingFolderErrors', map: 'FAIgnoreDeletingFolderErrors', type: 'boolean' },
          { name: 'FAIgnoreMissingFiles', map: 'FAIgnoreMissingFiles', type: 'boolean' },
          { name: 'FAIgnoreLockedFilesOnDest', map: 'FAIgnoreLockedFilesOnDest', type: 'boolean' },

          // Tabsheet AccessAndRetries/Wait and Retry
  
          { name: 'WRWaitForFileAccess', map: 'WRWaitForFileAccess', type: 'boolean' },
          { name: 'WRWaitIfTransferProblem', map: 'WRWaitIfTransferProblem', type: 'boolean' },
                        
          { name: 'WRAvoidRerunDueToLocked', map: 'WRAvoidRerunDueToLocked', type: 'boolean' },
          { name: 'WRMaxReRuns', map: 'WRMaxReRuns', type: 'number' },
          { name: 'WRRetryAfter', map: 'WRRetryAfter', type: 'number' },
          { name: 'WRWaitUpToMin', map: 'WRWaitUpToMin', type: 'number' },
                      
          { name: 'WRBuildingFileList', map: 'WRBuildingFileList', type: 'boolean' },
          { name: 'WRRunningTheProfile', map: 'WRRunningTheProfile', type: 'boolean' },
          { name: 'WRReRunRadiogroupWidget', map: 'WRReRunRadiogroupWidget' },


          // Tabsheet Comparison Comparison
          { name: 'ComparIgnoreSmallTimeDiff', map: 'ComparIgnoreSmallTimeDiff', type: 'boolean' },
          { name: 'ComparIgnoreExactHourTimeDiff', map: 'ComparIgnoreExactHourTimeDiff', type: 'boolean' },

          { name: 'ComparIgnoreSec', map: 'ComparIgnoreSec', type: 'number' },
          { name: 'ComparIgnoreHours', map: 'ComparIgnoreHours', type: 'number' },
          { name: 'ComparIgnoreSeconds', map: 'ComparIgnoreSeconds', type: 'boolean' },
          { name: 'ComparIgnoreTimestampAlltogether', map: 'ComparIgnoreTimestampAlltogether', type: 'boolean' },
          { name: 'ComparWhenSizeIsDiffentRadiogroupWidget', map: 'ComparWhenSizeIsDiffentRadiogroupWidget' },
          { name: 'ComparAdjustTimestampOnly', map: 'ComparAdjustTimestampOnly', type: 'boolean' },
          { name: 'ComparStripReadOnlyAttr', map: 'ComparStripReadOnlyAttr', type: 'boolean' },

          // Tabsheet Comparison->More
          { name: 'ComparMoreAlwaysCopyFiles', map: 'ComparMoreAlwaysCopyFiles', type: 'boolean' },
          { name: 'ComparMoreBinaryComparison', map: 'ComparMoreBinaryComparison', type: 'boolean' },
          { name: 'ComparMoreBinCompRemember', map: 'ComparMoreBinCompRemember', type: 'boolean' },
          { name: 'ComparMoreBinaryLeftSide', map: 'ComparMoreBinaryLeftSide', type: 'boolean' },
          { name: 'ComparMoreBinaryRightSide', map: 'ComparMoreBinaryRightSide', type: 'boolean' },
          { name: 'ComparMoreDetectHardLinks', map: 'ComparMoreDetectHardLinks', type: 'boolean' },
          { name: 'ComparMoreEnforceHardLinks', map: 'ComparMoreEnforceHardLinks', type: 'boolean' },
          { name: 'ComparMoreVerifySyncStatistics', map: 'ComparMoreVerifySyncStatistics', type: 'boolean' },
          { name: 'ComparMoreFolderAttr', map: 'ComparMoreFolderAttr', type: 'boolean' },
          { name: 'ComparMoreFileAttr', map: 'ComparMoreFileAttr', type: 'boolean' },
          { name: 'ComparMoreCaseSensitivity', map: 'ComparMoreCaseSensitivity', type: 'boolean' },
          { name: 'ComparMoreFolderTimes', map: 'ComparMoreFolderTimes', type: 'boolean' },

          // Tabsheet Files
          { name: 'FilesDetectMovedFiles', map: 'FilesDetectMovedFiles', type: 'boolean' },
          { name: 'FilesDetectRenamedFiles', map: 'FilesDetectRenamedFiles', type: 'boolean' },
          { name: 'FilesVerifyCopiedFiles', map: 'FilesVerifyCopiedFiles', type: 'boolean' },
          { name: 'FilesReCopyOnce', map: 'FilesReCopyOnce', type: 'boolean' },
          { name: 'FilesDoNotScanDestination', map: 'FilesDoNotScanDestination', type: 'boolean' },
          { name: 'FilesBypassFileBufferingLeft', map: 'FilesBypassFileBufferingLeft', type: 'boolean' },
          { name: 'FilesBypassFileBufferingRight', map: 'FilesBypassFileBufferingRight', type: 'boolean' },
          { name: 'FilesProtectFromBeingReplaced', map: 'FilesProtectFromBeingReplaced', type: 'boolean' },
          { name: 'FilesNumberToCopyInparallel', map: 'FilesNumberToCopyInparallel', type: 'number' },
          { name: 'FilesSplitLargeFiles', map: 'FilesSplitLargeFiles', type: 'string' },
          { name: 'FilesAutomaticallyResume', map: 'FilesAutomaticallyResume', type: 'boolean' },
          { name: 'FilesDetectMovedFilesRadiogroupWidget', map: 'FilesDetectMovedFilesRadiogroupWidget'},
                      

          // Tabsheet Files Deletions

          { name: 'FilesDeletions_OverwrittenFiles', map: 'FilesDeletions_OverwrittenFiles', type: 'boolean' },
          { name: 'FilesDeletions_DeletedFiles', map: 'FilesDeletions_DeletedFiles', type: 'boolean' },
          { name: 'FilesDeletions_MoveFilesToSFolder', map: 'FilesDeletions_MoveFilesToSFolder', type: 'boolean' },
          { name: 'FilesDeletions_DeleteOlderVersionsPermamently', map: 'FilesDeletions_DeleteOlderVersionsPermamently', type: 'boolean' },
          { name: 'FilesDeletions_RememberDeletionTime', map: 'FilesDeletions_RememberDeletionTime', type: 'boolean' },
          { name: 'FilesDeletions_DoubleCheckNonExistence', map: 'FilesDeletions_DoubleCheckNonExistence', type: 'boolean' },
          { name: 'FilesDeletions_NeverDelete', map: 'FilesDeletions_NeverDelete', type: 'boolean' },
          { name: 'FilesDeletions_DeleteBeforeCopying', map: 'FilesDeletions_DeleteBeforeCopying', type: 'boolean' },

          { name: 'MoveDeletedFilesIntoFolderL', map: 'MoveDeletedFilesIntoFolderL', type: 'string'},
          { name: 'MoveDeletedFilesIntoFolderR', map: 'MoveDeletedFilesIntoFolderR', type: 'string'},
                      
           // Tabsheet Files More

          { name: 'FilesMore_UseWindowsApi', map: 'FilesMore_UseWindowsApi', type: 'boolean' },
          { name: 'LinuxOwnerMode', map: 'LinuxOwnerMode', type: 'number' },
          { name: 'SetToOwner', map: 'SetToOwner', type: 'string' },
          { name: 'SetToGroup', map: 'SetToGroup', type: 'string' },
          { name: 'LinuxPermissionMode', map: 'LinuxPermissionMode', type: 'number' },
          { name: 'SetPermissions', map: 'SetPermissions', type: 'string' },
          { name: 'FilesMore_PreserveLastAccessOnSource', map: 'FilesMore_PreserveLastAccessOnSource', type: 'boolean' },
          { name: 'FilesMore_UseSpeedLimit', map: 'FilesMore_UseSpeedLimit', type: 'boolean' },
          { name: 'FilesMore_SpeedLimit', map: 'FilesMore_SpeedLimit', type: 'float' },
          { name: 'FilesMore_SpeedLimitAdvancedCb', map: 'FilesMore_SpeedLimitAdvancedCb', type: 'boolean' },
          { name: 'FilesMore_SkipIfFileSizeChanging', map: 'FilesMore_SkipIfFileSizeChanging', type: 'boolean' },
          { name: 'AdvSpeedLimitData', map: 'AdvSpeedLimitData'},
          { name: 'AddDest' },
          { name: 'FilesMore_AlwaysConsider', map: 'FilesMore_AlwaysConsider', type: 'boolean' },
          { name: 'FilesMore_AlwaysAppend', map: 'FilesMore_AlwaysAppend', type: 'boolean' },
          { name: 'FilesMore_CheckDestinationFile', map: 'FilesMore_CheckDestinationFile', type: 'boolean' },
          { name: 'FilesMore_IgnoreGlobalSpeedLimit', map: 'FilesMore_IgnoreGlobalSpeedLimit', type: 'boolean' },
          { name: 'FilesMore_AndCompareFileDetails', map: 'FilesMore_AndCompareFileDetails', type: 'boolean' },
          { name: 'FilesMore_ViaInternetProtocolsToo', map: 'FilesMore_ViaInternetProtocolsToo', type: 'boolean' },
          { name: 'FilesMore_CopiedFilesSysTime', map: 'FilesMore_CopiedFilesSysTime', type: 'boolean' },
          { name: 'FilesMore_FilesPerRun', map: 'FilesMore_FilesPerRun', type: 'decimal' },
          { name: 'FilesMore_CopyOnlyFilesPerRun', map: 'FilesMore_CopyOnlyFilesPerRun', type: 'boolean' },
          { name: 'FilesMore_MBPerRun', map: 'FilesMore_MBPerRun', type: 'decimal' },
          { name: 'FilesMore_CopyOnlyMBPerRun', map: 'FilesMore_CopyOnlyMBPerRun', type: 'boolean' },
          { name: 'FilesMore_NeverReplace', map: 'FilesMore_NeverReplace', type: 'boolean' },
          { name: 'FilesMore_DontAddAnyFiles', map: 'FilesMore_DontAddAnyFiles', type: 'boolean' },
          { name: 'FilesMore_CreateLinksInsteadOfCopying', map: 'FilesMore_CreateLinksInsteadOfCopying', type: 'boolean' },

          // Tabsheet Folders

          { name: 'Folders_CreateEmptyFolders', map: 'Folders_CreateEmptyFolders', type: 'boolean' },
          { name: 'Folders_UseIntermediateLocation', map: 'Folders_UseIntermediateLocation', type: 'boolean' },
          { name: 'Folders_IntermediateRightPath', map: 'Folders_IntermediateRightPath', type: 'string'},
          { name: 'Folders_ContinueAfterInterimIncomplete', map: 'Folders_ContinueAfterInterimIncomplete', type: 'boolean' },

          { name: 'Folders_RemoveEmptiedFolders', map: 'Folders_RemoveEmptiedFolders', type: 'boolean' },
          { name: 'Folders_OnRightSideCreateFolderEachTime', map: 'Folders_OnRightSideCreateFolderEachTime', type: 'boolean' },
          { name: 'Folders_IncludeTimeOfDay', map: 'Folders_IncludeTimeOfDay', type: 'boolean' },
          { name: 'Folders_FlatRightSide', map: 'Folders_FlatRightSide', type: 'boolean' },
          { name: 'Folders_CopyLatestFileIfExists', map: 'Folders_CopyLatestFileIfExists', type: 'boolean' },
          { name: 'Folders_FlatRightAddTimestampsForDupes', map: 'Folders_FlatRightAddTimestampsForDupes', type: 'boolean' },
          { name: 'Folders_EnsureFolderTimestamps', map: 'Folders_EnsureFolderTimestamps', type: 'boolean' },
          { name: 'Folders_UseIntermediateLocation', map: 'Folders_UseIntermediateLocation', type: 'boolean' },
          { name: 'DontDeleteFolders', map: 'DontDeleteFolders', type: 'boolean' },
          { name: 'TouchLeftParents', map: 'TouchLeftParents', type: 'boolean' },
          { name: 'TouchRightParents', map: 'TouchRightParents', type: 'boolean' },
          { name: 'Folders_ScanAllDestinationFoldersToFindMovedFiles', map: 'Folders_ScanAllDestinationFoldersToFindMovedFiles', type: 'boolean' },
          { name: 'Folders_CreateFolderSymlinksOnly', map: 'Folders_CreateFolderSymlinksOnly', type: 'boolean' },

          // Tabsheet Job
          { name: 'Job_ExecuteBefore', map: 'Job_ExecuteBefore'},
          { name: 'Job_ExecuteAfter', map: 'Job_ExecuteAfter'},
          { name: 'Job_OverrideEmailSettings', map: 'Job_OverrideEmailSettings', type: 'boolean' },
          { name: 'Job_ExecuteCommand', map: 'Job_ExecuteCommand', type: 'boolean' },
          { name: 'Job_DoRunAsUser', map: 'Job_DoRunAsUser', type: 'boolean' },
          { name: 'Job_RunAsUser', map: 'Job_RunAsUser'},
          { name: 'Job_RunAsDomain', map: 'Job_RunAsDomain'},
          { name: 'Job_RunAsPassword', map: 'Job_RunAsPassword'},
          { name: 'Job_ScanningThreads', map: 'Job_ScanningThreads', type: 'number' },
          { name: 'JobFilesThreadsRadiogroupWidget', map: 'JobFilesThreadsRadiogroupWidget'},
          { name: 'UsePascalScript', map: 'UsePascalScript', type: 'boolean' },
          { name: 'PascalScript', map: 'PascalScript'},

          { name: 'Job_ShowCheckboxesInPreview', map: 'Job_ShowCheckboxesInPreview', type: 'boolean' },
          { name: 'Job_CheckFreeSpaceBeforeCopying', map: 'Job_CheckFreeSpaceBeforeCopying', type: 'boolean' },
          { name: 'Job_IgnoreInternetConnectivityCheck', map: 'Job_IgnoreInternetConnectivityCheck', type: 'boolean' },
          { name: 'Job_RunOnlyIfNeitherSideEmpty', map: 'Job_RunOnlyIfNeitherSideEmpty', type: 'boolean' },
          { name: 'Job_WhenRunViaScheduler', map: 'Job_WhenRunViaScheduler', type: 'boolean' },
          { name: 'Job_WhenRunManuallyUnattended', map: 'Job_WhenRunManuallyUnattended', type: 'boolean' },
          { name: 'Job_WhenRunManuallyAttended', map: 'Job_WhenRunManuallyAttended', type: 'boolean' },

          { name: 'Job_NoEmail', map: 'Job_NoEmail', type: 'boolean' },
          { name: 'Job_EmailAlways', map: 'Job_EmailAlways', type: 'boolean' },
          { name: 'Job_NoLogFileAttach', map: 'Job_NoLogFileAttach', type: 'boolean' },
          { name: 'Job_EmailDontAttachFile', map: 'Job_EmailDontAttachFile', type: 'boolean' },
          { name: 'Job_EmailOnlyWhenError', map: 'Job_EmailOnlyWhenError', type: 'boolean' },
          { name: 'Job_EmailIfNothing', map: 'Job_EmailIfNothing', type: 'boolean' },
          { name: 'Job_NoDriveMissingEmail', map: 'Job_NoDriveMissingEmail', type: 'boolean' },
          { name: 'Job_EmailFilesOverride', map: 'Job_EmailFilesOverride', type: 'string' },
          { name: 'Job_OverrideRecipients', map: 'Job_OverrideRecipients'},
          { name: 'Job_AddRecipients', map: 'Job_AddRecipients', type: 'boolean' },
                      
          { name: 'Job_MakeConnection1', map: 'Job_MakeConnection1', type: 'boolean' },
          { name: 'Job_MakeConnection2', map: 'Job_MakeConnection2', type: 'boolean' },
          { name: 'Job_NetworkConnections', map: 'Job_NetworkConnections', type: 'boolean' },
          { name: 'JobNetworkPath1', map: 'JobNetworkPath1' },
          { name: 'JobNetworkPath2', map: 'JobNetworkPath2' },
          { name: 'JobNetworkUsername1', map: 'JobNetworkUsername1' },
          { name: 'JobNetworkUsername2', map: 'JobNetworkUsername2' },
          { name: 'JobNetworkPassword1', map: 'JobNetworkPassword1' },
          { name: 'JobNetworkPassword2', map: 'JobNetworkPassword2' },
          { name: 'JobReconnect1', map: 'JobReconnect1', type: 'boolean' },
          { name: 'JobReconnect2', map: 'JobReconnect2', type: 'boolean' },
          { name: 'JobDisconnect1', map: 'JobDisconnect1', type: 'boolean' },
          { name: 'JobDisconnect2', map: 'JobDisconnect2', type: 'boolean' },
    
          // Masks and Filters
          // Inclusion masks
          { name: 'Masks_InclusionMasks', map: 'Masks_InclusionMasks', type: 'string' },
          { name: 'Masks_ExclusionMasks', map: 'Masks_ExclusionMasks', type: 'string' },
          { name: 'ExclucionFilesWidget', map: 'ExclucionFilesWidget', type: 'string' },
          { name: 'Masks_UseGlobalExclAlso', map: 'Masks_UseGlobalExclAlso', type: 'boolean' },
          { name: 'Masks_IncludeBackupFiles', map: 'Masks_IncludeBackupFiles', type: 'boolean' },
          { name: 'Masks_SpecFolderMasks', map: 'Masks_SpecFolderMasks', type: 'boolean' },
                      
          { name: 'Masks_ScanWholeTreeForFolderMasks', map: 'Masks_ScanWholeTreeForFolderMasks', type: 'boolean' },
          { name: 'Masks_IncludeAllSubfoldersOfMatchingFolders', map: 'Masks_IncludeAllSubfoldersOfMatchingFolders', type: 'boolean' },
          { name: 'Masks_ProcessFoundFoldersOnlyIfExistOnBothSides', map: 'Masks_ProcessFoundFoldersOnlyIfExistOnBothSides', type: 'boolean' },
          { name: 'Masks_FolderMasks', map: 'Masks_FolderMasks' },
          { name: 'Masks_Restrictions', map: 'Masks_Restrictions' },
          { name: 'Masks_RestrictionsCb', map: 'Masks_RestrictionsCb', type: 'boolean' },
          { name: 'MasksRestrictionsDirection', map: 'MasksRestrictionsDirection' },

          // Masks and Filters General
          { name: 'Masks_ProcessHiddenFiles', map: 'Masks_ProcessHiddenFiles', type: 'boolean' },
          { name: 'Masks_SearchHiddenFolders', map: 'Masks_SearchHiddenFolders', type: 'boolean' },

          { name: 'SymLinksFiles', map: 'SymLinksFiles', type: 'string' },
          { name: 'SymLinksFolders', map: 'SymLinksFolders', type: 'string' },

          { name: 'Masks_ProcessReparsePoints', map: 'Masks_ProcessReparsePoints', type: 'boolean' },
          { name: 'Masks_FollowJunctionPointsFiles', map: 'Masks_FollowJunctionPointsFiles', type: 'boolean' },
          { name: 'Masks_FollowJunctionPointsFolders', map: 'Masks_FollowJunctionPointsFolders', type: 'boolean' },
          { name: 'Masks_CopyOtherReparsePoints', map: 'Masks_CopyOtherReparsePoints', type: 'boolean' },
          { name: 'Masks_CopyFilesWithArchiveFlag', map: 'Masks_CopyFilesWithArchiveFlag', type: 'boolean' },
          { name: 'Masks_ClearArchiveFlags', map: 'Masks_ClearArchiveFlags', type: 'boolean' },
          { name: 'RestoreDeletedItems', map: 'RestoreDeletedItems', type: 'boolean' },
          { name: 'SymlinkFilesLeft', map: 'SymlinkFilesLeft', type: 'boolean' },
          { name: 'SymlinkFilesRight', map: 'SymlinkFilesRight', type: 'boolean' },
          { name: 'ScanOnlyFoldersModifiedSinceLastRun', map: 'ScanOnlyFoldersModifiedSinceLastRun', type: 'boolean' },
          { name: 'CopyPinnedFilesOnlyLeft', map: 'CopyPinnedFilesOnlyLeft', type: 'boolean' },
          { name: 'CopyPinnedFilesOnlyRight', map: 'CopyPinnedFilesOnlyRight', type: 'boolean' },
          { name: 'SkipOfflineFiles', map: 'SkipOfflineFiles', type: 'boolean' },

          // Tabsheet Masks and Filters  File age and size
          { name: 'Masks_FileSizesWithin', map: 'Masks_FileSizesWithin', type: 'boolean' },
          { name: 'Masks_FileSizesMin', map: 'Masks_FileSizesMin', type: 'string' },
          { name: 'Masks_FileSizesMax', map: 'Masks_FileSizesMax', type: 'string' },
          { name: 'Masks_FileDatesWithin', map: 'Masks_FileDatesWithin', type: 'boolean' },
          { name: 'Masks_FileMinDate', map: 'Masks_FileMinDate', type: 'string' },
          { name: 'Masks_FileMaxDate', map: 'Masks_FileMaxDate', type: 'string' },
          { name: 'Masks_TargetDataRestore', map: 'Masks_TargetDataRestore', type: 'boolean' },
          { name: 'Masks_TargetDateRestoreDate', map: 'Masks_TargetDateRestoreDate', type: 'string' },
          { name: 'Masks_TargetDateRestoreTime', map: 'Masks_TargetDateRestoreTime', type: 'string' },
          { name: 'Masks_FilterByWidget', map: 'Masks_FilterByWidget', type: 'string' },
          { name: 'Masks_ApplyToWidget', map: 'Masks_ApplyToWidget', type: 'string' },
                      

          { name: 'Masks_FileAgeCb', map: 'Masks_FileAgeCb', type: 'boolean' },
          { name: 'Masks_FileAgeDays', map: 'Masks_FileAgeDays', type: 'number' },
          { name: 'Masks_FileAgeHours', map: 'Masks_FileAgeHours', type: 'number' },
          { name: 'Masks_FileAgeMinutes', map: 'Masks_FileAgeMinutes', type: 'number' },
          { name: 'Masks_FileAgeComboIndex', map: 'Masks_FileAgeComboIndex', type: 'number' },

            // Tabsheet  Safety Attented
          { name: 'Safety_WarnIfMovingFiles', map: 'Safety_WarnIfMovingFiles', type: 'boolean' },
          { name: 'Safety_WarnBeforeOverridingReadOnly', map: 'Safety_WarnBeforeOverridingReadOnly', type: 'boolean' },
          { name: 'Safety_WarnBeforeOverridingLarger', map: 'Safety_WarnBeforeOverridingLarger', type: 'boolean' },
          { name: 'Safety_WarnBeforeOverridingNewer', map: 'Safety_WarnBeforeOverridingNewer', type: 'boolean' },
          { name: 'Safety_WarnBeforeDeleting', map: 'Safety_WarnBeforeDeleting', type: 'boolean' },

          // Tabsheet Safety Unattended Mode

          { name: 'SafetyUnattended_OverwriteReadOnly', map: 'SafetyUnattended_OverwriteReadOnly', type: 'boolean' },
          { name: 'SafetyUnattended_OverwriteLarge', map: 'SafetyUnattended_OverwriteLarge', type: 'boolean' },
          { name: 'SafetyUnattended_NewerFilesCanBeOverwritten', map: 'SafetyUnattended_NewerFilesCanBeOverwritten', type: 'boolean' },
          { name: 'SafetyUnattended_FileDeletionAllowedCb', map: 'SafetyUnattended_FileDeletionAllowedCb', type: 'boolean' },
          { name: 'SafetyUnattended_EnableSpecialSafetyCheck', map: 'SafetyUnattended_EnableSpecialSafetyCheck', type: 'boolean' },
          { name: 'SafetyUnattended_ReplaceMaxPercent', map: 'SafetyUnattended_ReplaceMaxPercent', type: 'decimal' },
          { name: 'SafetyUnattended_ReplaceMaxPercentCb', map: 'SafetyUnattended_ReplaceMaxPercentCb', type: 'boolean' },


          { name: 'SafetyUnattended_FileDeletionAllowed', map: 'SafetyUnattended_FileDeletionAllowed', type: 'decimal' },
          { name: 'SafetyUnattended_DeleteMaxFiles', map: 'SafetyUnattended_DeleteMaxFiles', type: 'decimal' },

          // Tabsheet Special SpecialFeatures
          { name: 'SpecialSpFeatr_CacheDestinationFileList', map: 'SpecialSpFeatr_CacheDestinationFileList', type: 'boolean' },
          { name: 'Special_DoubleCheckCacheHoles', map: 'Special_DoubleCheckCacheHoles', type: 'boolean' },
          { name: 'Special_RefreshCacheEvery', map: 'Special_RefreshCacheEvery', type: 'decimal' },
          { name: 'Special_CacheNotRefreshedCounter', map: 'Special_CacheNotRefreshedCounter', type: 'decimal' },

          { name: 'CopyingOrder', map: 'CopyingOrder', type: 'number' },
          { name: 'UseRemServToCopyFiles', map: 'UseRemServToCopyFiles', type: 'number' },

          { name: 'SpecialSpFeatr_UsePartialFileUpdating', map: 'SpecialSpFeatr_UsePartialFileUpdating', type: 'boolean' },
          { name: 'BlockLevelRadiogroupWidget', map: 'BlockLevelRadiogroupWidget'},
          { name: 'SpecialSpFeatr_RightSideRemoteService', map: 'SpecialSpFeatr_RightSideRemoteService', type: 'boolean' },
          { name: 'SpecialSpFeatr_FastMode', map: 'SpecialSpFeatr_FastMode', type: 'boolean' },
          { name: 'SpecialSpFeatr_LeftSideUsesRemoteService', map: 'SpecialSpFeatr_LeftSideUsesRemoteService', type: 'boolean' },
          { name: 'SpecialSpFeatr_RightSideUsesRemoteService', map: 'SpecialSpFeatr_RightSideUsesRemoteService', type: 'boolean' },
          { name: 'SpecialSpFeatr_UseDifferentFolders', map: 'SpecialSpFeatr_UseDifferentFolders', type: 'boolean' },
          { name: 'RedownloadServerModifiedUploads', map: 'RedownloadServerModifiedUploads', type: 'boolean' },
          { name: 'DoubleCheckTimestamps', map: 'DoubleCheckTimestamps', type: 'boolean' },
          { name: 'DetectChangedFilesViaMonitoring', map: 'DetectChangedFilesViaMonitoring', type: 'boolean' },
          { name: 'SpecialSpFeatr_SetTargetVolumeLabel', map: 'SpecialSpFeatr_SetTargetVolumeLabel' },
          { name: 'cbSpawnSeparateSubJobs', map: 'cbSpawnSeparateSubJobs', type: 'boolean' },
          { name: 'inptSpawnSeparateSubJobs', map: 'inptSpawnSeparateSubJobs', type: 'number' },

          { name: 'Special_DontFallBackFromPartialCb', map: 'Special_DontFallBackFromPartialCb' },
          { name: 'Special_PartialRemoteOneByOneCb', map: 'Special_PartialRemoteOneByOneCb' },

          { name: 'Special_CommPathForLeftSide', map: 'Special_CommPathForLeftSide' },
          { name: 'Special_CommLocalPath1', map: 'Special_CommLocalPath1' },
          { name: 'Special_CommPathForRightSide', map: 'Special_CommPathForRightSide' },
          { name: 'Special_CommLocalPath2', map: 'Special_CommLocalPath2' },
                                               
          //Security and Shares Dlg
          { name: 'ProcessSecurityAndShares', map: 'ProcessSecurityAndShares', type: 'boolean' },
          { name: 'Special_CopyOwnerSetting', map: 'Special_CopyOwnerSetting', type: 'boolean' },
          { name: 'Special_CopyGroupSetting', map: 'Special_CopyGroupSetting', type: 'boolean' },
          { name: 'Special_CopyPermissions', map: 'Special_CopyPermissions', type: 'boolean' },
          { name: 'Special_ProcessBaseFolder', map: 'Special_ProcessBaseFolder', type: 'boolean' },
          { name: 'CompareOwner', map: 'CompareOwner', type: 'boolean' },
          { name: 'CompareGroup', map: 'CompareGroup', type: 'boolean' },
          { name: 'ComparePermissions', map: 'ComparePermissions', type: 'boolean' },
          { name: 'CompareACLs', map: 'CompareACLs', type: 'boolean' },
          { name: 'BreakInheritance', map: 'BreakInheritance', type: 'boolean' },
          { name: 'CopyInheritedAsExplicitIfNecessary', map: 'CopyInheritedAsExplicitIfNecessary', type: 'boolean' },
          { name: 'UpdateFolderSecurity', map: 'UpdateFolderSecurity', type: 'boolean' },
          { name: 'TranslateSIDs', map: 'TranslateSIDs', type: 'boolean' },
          { name: 'TargetDomain', map: 'TargetDomain', type: 'string' },
          { name: 'UsePermissionFilesLeft', map: 'UsePermissionFilesLeft', type: 'boolean' },
          { name: 'UsePermissionFilesRight', map: 'UsePermissionFilesRight', type: 'boolean' },
          { name: 'PutPermissionsIntoCompressedFiles', map: 'PutPermissionsIntoCompressedFiles', type: 'boolean' },
          { name: 'ApplyPermissionsToCompressedFiles', map: 'ApplyPermissionsToCompressedFiles', type: 'boolean' },
          { name: 'AssumeUnreadableDifferent', map: 'AssumeUnreadableDifferent', type: 'boolean' },
          { name: 'StripUnknownSIDs', map: 'StripUnknownSIDs', type: 'boolean' },

          { name: 'CopyShares', map: 'CopyShares', type: 'boolean' },
          { name: 'CompareSharePaths', map: 'CompareSharePaths', type: 'boolean' },
          { name: 'CompareSharePermissions', map: 'CompareSharePermissions', type: 'boolean' },
          { name: 'ShareSelectedFoldersOnly', map: 'ShareSelectedFoldersOnly', type: 'boolean' },
          { name: 'ShareTranslatePaths', map: 'ShareTranslatePaths', type: 'boolean' },

          { name: 'CopyADS', map: 'CopyADS', type: 'boolean' },
          { name: 'CompareADS', map: 'CompareADS', type: 'boolean' },
          { name: 'ApplyADSToCompressedFiles', map: 'ApplyADSToCompressedFiles', type: 'boolean' },
          { name: 'PutADSIntoCompressedFiles', map: 'PutADSIntoCompressedFiles', type: 'boolean' },
          { name: 'FolderADSinMetadataFilesLeft', map: 'FolderADSinMetadataFilesLeft', type: 'boolean' },
          { name: 'FolderADSinMetadataFilesRight', map: 'FolderADSinMetadataFilesRight', type: 'boolean' },
          { name: 'Special_SplitResourceForksCb', map: 'Special_SplitResourceForksCb', type: 'boolean' },

            // Tabsheet Special Database
          { name: 'SpDb_OpenDatabaseReadOnly', map: 'SpDb_OpenDatabaseReadOnly', type: 'boolean' },
          { name: 'SpecialDatabase_FastMode', map: 'SpecialDatabase_FastMode', type: 'boolean' },
          { name: 'SpecialDatabase_DatabaseNameToUse', map: 'SpecialDatabase_DatabaseNameToUse' },
          { name: 'SpecialDatabase_Left', map: 'SpecialDatabase_Left', type: 'string' },
          { name: 'SpecialDatabase_Right', map: 'SpecialDatabase_Right', type: 'string' },
          // Tabsheet special Safety
          { name: 'SafetySpecial_WarnIfDeletingFilesMoreThanVal', map: 'SafetySpecial_WarnIfDeletingFilesMoreThanVal', type: 'decimal' },
          { name: 'SafetySpecial_WarnIfDeletingFilesMoreThan', map: 'SafetySpecial_WarnIfDeletingFilesMoreThan', type: 'boolean' },
          { name: 'SafetySpecial_WarnIfDeletingAllFilesInAnySubfolder', map: 'SafetySpecial_WarnIfDeletingAllFilesInAnySubfolder', type: 'boolean' },
          { name: 'SafetySpecial_WarnIfDeletingMoreThanInAnySubfolderVal', map: 'SafetySpecial_WarnIfDeletingMoreThanInAnySubfolderVal', type: 'decimal' },
          { name: 'SafetySpecial_WarnIfDeletingMoreThanInAnySubfolder', map: 'SafetySpecial_WarnIfDeletingMoreThanInAnySubfolder', type: 'boolean' },
                                            


           // Tabsheet Versioning - > Synthetic Backup
          { name: 'VersSynth_BuildAllIncremental', map: 'VersSynth_BuildAllIncremental', type: 'boolean' },
          { name: 'VersSynth_RemoveUnneededCb', map: 'VersSynth_RemoveUnneededCb', type: 'boolean' },
          { name: 'VersSynth_RemoveUnneeded', map: 'VersSynth_RemoveUnneeded', type: 'number' },
          { name: 'VersSynth_IfAllBlocksCb', map: 'VersSynth_IfAllBlocksCb', type: 'boolean' },

          { name: 'VersSynth_CreateCheckpointComboIndex', map: 'VersSynth_CreateCheckpointComboIndex', type: 'number' },
          { name: 'VersSynth_CheckpointsRelativeComboIndex', map: 'VersSynth_CheckpointsRelativeComboIndex', type: 'number' },
          { name: 'VersSynth_RemoveUnneededComboIndex', map: 'VersSynth_RemoveUnneededComboIndex', type: 'number' },
          { name: 'VersSynth_UseSynthBackups', map: 'VersSynth_UseSynthBackups', type: 'boolean' },
          { name: 'VersSynth_UseCheckPoints', map: 'VersSynth_UseCheckPoints', type: 'boolean' },


          // Tabsheet Vesioning Versioning
          { name: 'VersVers_KeepOlderVersionsWhenReplacing', map: 'VersVers_KeepOlderVersionsWhenReplacing', type: 'boolean' },
          { name: 'VersVers_PerFile', map: 'VersVers_PerFile', type: 'number' },
          { name: 'VersVers_OnlyOnRightHandSide', map: 'VersVers_OnlyOnRightHandSide', type: 'boolean' },
          { name: 'VersVers_MoveIntoFolder', map: 'VersVers_MoveIntoFolder', type: 'boolean' },
          { name: 'VersVers_MoveIntoFolderInpt', map: 'VersVers_MoveIntoFolderInpt', type: 'string' },
          { name: 'VersVers_AsSubfolerInEachFolder', map: 'VersVers_AsSubfolerInEachFolder', type: 'boolean' },
          { name: 'VersVers_RecreateTreeBelow', map: 'VersVers_RecreateTreeBelow', type: 'boolean' },
          { name: 'VersVers_KeepOneVersionOfDeletedFiles', map: 'VersVers_KeepOneVersionOfDeletedFiles', type: 'boolean' },
          { name: 'VersVers_FileNameEncoding', map: 'VersVers_FileNameEncoding', type: 'boolean' },
          { name: 'VersVers_RenamingOlderVersions', map: 'VersVers_RenamingOlderVersions', type: 'string' },
          { name: 'VersVers_DontRenameNewestOlderVersion', map: 'VersVers_DontRenameNewestOlderVersion', type: 'boolean' },
          { name: 'VersMore_FilesBackupV4Cb', map: 'VersMore_FilesBackupV4Cb', type: 'boolean' },


          // Tabsheet Versioning More
          { name: 'VersMore_DoNotDecodeLeftHandCb', map: 'VersMore_DoNotDecodeLeftHandCb', type: 'boolean' },
          { name: 'VersMore_DoNotDecodeRightHandCb', map: 'VersMore_DoNotDecodeRightHandCb', type: 'boolean' },
          { name: 'EncodeWithWindows10Mangling', map: 'EncodeWithWindows10Mangling', type: 'boolean' },
          { name: 'DecodeAllManglingFormats', map: 'DecodeAllManglingFormats', type: 'boolean' },
          { name: 'VersMore_CleanUpAllOlderVersionsCb', map: 'VersMore_CleanUpAllOlderVersionsCb', type: 'boolean' },
          { name: 'VersMore_RemoveParenthesizedCb', map: 'VersMore_RemoveParenthesizedCb', type: 'boolean' },
          { name: 'VersMore_RemoveVesioningTagsCb', map: 'VersMore_RemoveVesioningTagsCb', type: 'boolean' },
          { name: 'VersMore_CleanUpIdenticalCb', map: 'VersMore_CleanUpIdenticalCb', type: 'boolean' },
          { name: 'VersMore_CleanUpDuplicatesOnSourceSide', map: 'VersMore_CleanUpDuplicatesOnSourceSide', type: 'boolean' },

          // Tabsheet Zip
          { name: 'Zipping_ZipEachFile', map: 'Zipping_ZipEachFile', type: 'boolean' },
          { name: 'ZipFormat', map: 'ZipFormat', type: 'number' },
          { name: 'ZipLevel', map: 'ZipLevel', type: 'number' },
          { name: 'Zipping_ZipDirectlyToDestination', map: 'Zipping_ZipDirectlyToDestination', type: 'boolean' },
          { name: 'Zipping_UseZipPackages', map: 'Zipping_UseZipPackages', type: 'boolean' },
          { name: 'Zipping_UnzipAllfiles', map: 'Zipping_UnzipAllfiles', type: 'boolean' },
          { name: 'Zipping_LimitInpt', map: 'Zipping_LimitInpt', type: 'string' },
           { name: 'Zipping_LimitZipFileSizeCb', map: 'Zipping_LimitZipFileSizeCb', type: 'boolean' },
          { name: 'ZippingEncrypt_Password', map: 'ZippingEncrypt_Password', type: 'string' },
          { name: 'ZippingEncrypt_ComboIndex', map: 'ZippingEncrypt_ComboIndex', type: 'number' },
          { name: 'ZippingEncrypt_EncryptFiles', map: 'ZippingEncrypt_EncryptFiles', type: 'boolean' },
          { name: 'ZippingEncrypt_DecryptFiles', map: 'ZippingEncrypt_DecryptFiles', type: 'boolean' },
          { name: 'ZippingEncrypt_FilenameEncryption', map: 'ZippingEncrypt_FilenameEncryption', type: 'boolean' },
          { name: 'ZippingEncrypt_FoldernameEncryption', map: 'ZippingEncrypt_FoldernameEncryption', type: 'boolean' },
          { name: 'ZippingEncrypt_EncryptExistingNames', map: 'ZippingEncrypt_EncryptExistingNames', type: 'boolean' },
                      
          { name: 'Zip_UseRemoteUnzipService', map: 'Zip_UseRemoteUnzipService', type: 'boolean' },
          { name: 'Zip_UseProfileNameForPackage', map: 'Zip_UseProfileNameForPackage', type: 'boolean' },
          { name: 'Zip_SeparateZipPerFolder', map: 'Zip_SeparateZipPerFolder', type: 'boolean' },
          { name: 'Zip_TimestampZIPs', map: 'Zip_TimestampZIPs', type: 'boolean' },
          { name: 'Zip_ReplaceZIPPackages', map: 'Zip_ReplaceZIPPackages', type: 'boolean' },
          { name: 'Zip_FilesPerPackage', map: 'Zip_FilesPerPackage', type: 'number' },
          { name: 'Zip_MaxSizeForPackage', map: 'Zip_MaxSizeForPackage', type: 'string' },
          ] ,
      datatype: "json",
      id: 'Name'
                  
  };
     

var GIntProtSetSource =
 {
    datatype: "json",
    id: 'Name',
 };


function InitProtocolSettingsDatasource( IntProtSetSource, ProfileName, LeftOrRight, ProtocolName )
{
   CheckError(ProfileName != '', 'InitProtocolSettingsDatasource: ProfileName param is Empty');
   CheckError(ProtocolName != '', 'InitProtocolSettingsDatasource: ProtocolName param is Empty');
   CheckError(ProtocolName != undefined, 'InitProtocolSettingsDatasource: ProtocolName param is undefined');

   CheckError(LeftOrRight != '', 'InitProtocolSettingsDatasource: LeftOrRight param is Empty');
   CheckError(IntProtSetSource != undefined, 'InitProtocolSettingsDatasource: IntProtSetSource param is undefined');

   var sendparams = { };
   sendparams.ProfileName = ProfileName;
   sendparams.LeftOrRight = LeftOrRight;
   sendparams.ProtocolName = ProtocolName;
   sendparams.token = GClientToken;
   var json = JSON.stringify(sendparams);

   IntProtSetSource.url = "internet_settings.php?qry=" + encodeURIComponent(json);//ProfileName +"_" + LeftOrRight+ "_" + ProtocolName;

   var LBaseProtocolName=GetBaseProtocolName(ProtocolName);

   if (LBaseProtocolName == "FTP" )
   {
      IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'LibraryComboIndex', map: 'LibraryComboIndex', type: 'number' },
              { name: 'url', map: 'url', type: 'string' },

              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
              { name: 'Password', map: 'Password', type: 'string' },

              { name: 'port', map: 'port', type: 'number' },

              { name: 'adv_CharsetComboIndex', map: 'adv_CharsetComboIndex', type: 'number' },
                       
              { name: 'autozone', map: 'autozone', type: 'boolean' },
              { name: 'UTC', map: 'UTC', type: 'boolean' },

              { name: 'passive_mode', map: 'passive_mode', type: 'boolean' },
              { name: 'absolutepath', map: 'absolutepath', type: 'boolean' },
              { name: 'adv_ascii_transfer_mode', map: 'adv_ascii_transfer_mode', type: 'boolean' },
              { name: 'adv_server_supports_moving', map: 'adv_server_supports_moving', type: 'boolean' },

              { name: 'adv_verify_file', map: 'adv_verify_file', type: 'boolean' },
              { name: 'adv_respect_passive_mode', map: 'adv_respect_passive_mode', type: 'boolean' },

              { name: 'Security_Mode_Group', map: 'Security_Mode_Group', type: 'string' },
              { name: 'Auth_Cmd_Group', map: 'Auth_Cmd_Group', type: 'string' },
              { name: 'security_CertificateComboIndex', map: 'security_CertificateComboIndex', type: 'number' },
              { name: 'security_CertificatePassword', map: 'security_CertificatePassword', type: 'string' },
              { name: 'security_nopassword', map: 'security_nopassword', type: 'boolean' },
                        
              { name: 'Version_Group', map: 'Version_Group', type: 'string' },
              { name: 'adv_ListingCommandComboIndex', map: 'adv_ListingCommandComboIndex', type: 'number' },
              { name: 'adv_TimestampsForUploadsComboIndex', map: 'adv_TimestampsForUploadsComboIndex', type: 'number' },
              { name: 'adv_list', map: 'adv_list', type: 'decimal' },
              { name: 'adv_upload_min', map: 'adv_upload_min', type: 'decimal' },
              { name: 'proxy_send_host_command', map: 'proxy_send_host_command', type: 'boolean' },
                        
              { name: 'Security_SSH_username_password', map: 'Security_SSH_username_password', type: 'boolean' },
              { name: 'Security_SSH_keyboard', map: 'Security_SSH_keyboard', type: 'boolean' },
              { name: 'Security_SSH_certificate', map: 'Security_SSH_certificate', type: 'boolean' }
            ];
      }
   else
   if (LBaseProtocolName == "SMB" )
   {
      IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'url', map: 'url', type: 'string' },
              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
              { name: 'Password', map: 'Password', type: 'string' },
               ];
      }
   else
      if (LBaseProtocolName == "SSH" )
      {
         IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'LibraryComboIndex', map: 'LibraryComboIndex', type: 'number' },
              { name: 'url', map: 'url', type: 'string' },

              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
              { name: 'Password', map: 'Password', type: 'string' },
                        
              { name: 'port', map: 'port', type: 'number' },
              { name: 'usePutty', map: 'usePutty', type: 'boolean' },
              { name: 'absolutepath', map: 'absolutepath', type: 'boolean' },

              { name: 'adv_CharsetComboIndex', map: 'adv_CharsetComboIndex', type: 'number' },
              { name: 'adv_verify_destination_file', map: 'adv_verify_destination_file', type: 'boolean' },
                        
              { name: 'autozone', map: 'autozone', type: 'boolean' },
              { name: 'UTC', map: 'UTC', type: 'boolean' },
                        
              { name: 'adv_list', map: 'adv_list', type: 'number' },
              { name: 'adv_upload_min', map: 'adv_upload_min', type: 'number' },

              { name: 'security_CertificateComboIndex', map: 'security_CertificateComboIndex', type: 'number' },
              { name: 'security_CertificatePassword', map: 'security_CertificatePassword', type: 'string' },
              { name: 'security_nopassword', map: 'security_nopassword', type: 'boolean' },
                        
              { name: 'Security_username_password', map: 'Security_username_password', type: 'boolean' },
              { name: 'Security_keyboard', map: 'Security_keyboard', type: 'boolean' },
              { name: 'Security_certificate', map: 'Security_certificate', type: 'boolean' },
                        
              { name: 'EncryptionAlgorithms', map: 'EncryptionAlgorithms', type: 'number' },

              { name: 'PublicKeyAlgorithms', map: 'PublicKeyAlgorithms', type: 'number' },
              { name: 'MACAlgorithms', map: 'MACAlgorithms', type: 'number' },
              { name: 'KeyExchangeAlgorithms', map: 'KeyExchangeAlgorithms', type: 'number' },
              { name: 'SFTPVersionSet', map: 'SFTPVersionSet', type: 'number' },
              { name: 'CompressionLevel', map: 'CompressionLevel', type: 'number' },
              { name: 'AutoAdjustCiphers', map: 'AutoAdjustCiphers', type: 'boolean' },
              { name: 'AutoAdjustTransferBlock', map: 'AutoAdjustTransferBlock', type: 'boolean' },
                                                            
              { name: 'DownloadBlockSize', map: 'DownloadBlockSize', type: 'decimal' },
              { name: 'UploadBlockSize', map: 'UploadBlockSize', type: 'decimal' },
              { name: 'SFTPBufferSize', map: 'SFTPBufferSize', type: 'decimal' },
              { name: 'PipelineLength', map: 'PipelineLength', type: 'decimal' },
                        
              ];
       }
       else if (LBaseProtocolName == 'WebDAV' )
       {
          IntProtSetSource.datafields = [
            { name: 'Name', type: 'string' },
            { name: 'LibraryComboIndex', map: 'LibraryComboIndex', type: 'number' },
            { name: 'url', map: 'url', type: 'string' },
            { name: 'AuthenticationComboIndex', map: 'AuthenticationComboIndex', type: 'number' },
            { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
            { name: 'login', map: 'login', type: 'string' },
            { name: 'Password', map: 'Password', type: 'string' },
            { name: 'adv_CharsetComboIndex', map: 'adv_CharsetComboIndex', type: 'number' },
            { name: 'adv_strategyCombo', map: 'adv_strategyCombo', type: 'number' },
            { name: 'adv_use_displayname', map: 'adv_use_displayname', type: 'boolean' },
            { name: 'adv_use_expect_100_continue', map: 'adv_use_expect_100_continue', type: 'boolean' },
            { name: 'adv_TimestampsForUploads', map: 'adv_TimestampsForUploads', type: 'number' },

            { name: 'adv_http_retries', map: 'adv_http_retries', type: 'number' },
            { name: 'WebDAV_Version_Group', type: 'string' }
            ];

       }
        else if (LBaseProtocolName == 'Amazon S3' )
        {

          IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'bucket', map: 'bucket', type: 'string' },
              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
              { name: 'Password', map: 'Password', type: 'string' },

              { name: 'make_uploaded_files_pub_available', map: 'make_uploaded_files_pub_available', type: 'boolean' },
              { name: 'use_transfer_acceleration', map: 'use_transfer_acceleration', type: 'boolean' },
              { name: 'use_server_side_encryption', map: 'use_server_side_encryption', type: 'boolean' },
              { name: 'reduced_redundancy', map: 'reduced_redundancy', type: 'number' }
             ]
                              
       }
      else if (LBaseProtocolName == 'Google Drive'  )
      {

          IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'container', map: 'container', type: 'string' },
              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },

              { name: 'adv_enable_doc_convercion', map: 'adv_enable_doc_convercion', type: 'boolean' },
              { name: 'create_links', map: 'create_links', type: 'boolean' },
              { name: 'clenup_in_folder', map: 'clenup_in_folder', type: 'boolean' },

              { name: 'GDocs_Spreads_Group', map: 'GDocs_Spreads_Group', type: 'string' },
              { name: 'GDocs_TextDocs_Group', map: 'GDocs_TextDocs_Group', type: 'string' },
              { name: 'GDocs_Pres_Group', map: 'GDocs_Pres_Group', type: 'string' },
              { name: 'GDocs_Draw_Group', map: 'GDocs_Draw_Group', type: 'string' },
              { name: 'GDocs_uploadconvert_csv', map: 'GDocs_uploadconvert_csv', type: 'boolean' },
              { name: 'GDocs_uploadconvert_doc', map: 'GDocs_uploadconvert_doc', type: 'boolean' },
              { name: 'GDocs_uploadconvert_docx', map: 'GDocs_uploadconvert_docx', type: 'boolean' },
              { name: 'GDocs_uploadconvert_html', map: 'GDocs_uploadconvert_html', type: 'boolean' },
              { name: 'GDocs_uploadconvert_ods', map: 'GDocs_uploadconvert_ods', type: 'boolean' },
              { name: 'GDocs_uploadconvert_odt', map: 'GDocs_uploadconvert_odt', type: 'boolean' },
              { name: 'GDocs_uploadconvert_pdf', map: 'GDocs_uploadconvert_pdf', type: 'boolean' },
              { name: 'GDocs_uploadconvert_pps', map: 'GDocs_uploadconvert_pps', type: 'boolean' },
              { name: 'GDocs_uploadconvert_ppt', map: 'GDocs_uploadconvert_ppt', type: 'boolean' },
              { name: 'GDocs_uploadconvert_pptx', map: 'GDocs_uploadconvert_pptx', type: 'boolean' },
              { name: 'GDocs_uploadconvert_rtf', map: 'GDocs_uploadconvert_rtf', type: 'boolean' },
              { name: 'GDocs_uploadconvert_tsv', map: 'GDocs_uploadconvert_tsv', type: 'boolean' },
              { name: 'GDocs_uploadconvert_txt', map: 'GDocs_uploadconvert_txt', type: 'boolean' },
              { name: 'GDocs_uploadconvert_xls', map: 'GDocs_uploadconvert_xls', type: 'boolean' },
              { name: 'GDocs_uploadconvert_xlsx', map: 'GDocs_uploadconvert_xlsx', type: 'boolean' }
             ]
      }

      else if ((LBaseProtocolName == 'GDriveAlike') || (LBaseProtocolName == 'GDriveAlikeWithContainer'))
      {
          IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
          ]
      }
       else if (LBaseProtocolName == 'Azure' )
       {
          IntProtSetSource.datafields = [
            { name: 'Name', type: 'string' },
            { name: 'container', map: 'container', type: 'string' },
            { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
            { name: 'login', map: 'login', type: 'string' },
            { name: 'Password', map: 'Password', type: 'string' },
            { name: 'adv_cache_control', map: 'adv_cache_control', type: 'number' },
          ]
      }
       else if (LBaseProtocolName == 'Sharepoint' )
       {
          IntProtSetSource.datafields = [
            { name: 'Name', type: 'string' },
            { name: 'domain', map: 'domain', type: 'string' },
            { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
            { name: 'login', map: 'login', type: 'string' },
          ]
      }
      else if (LBaseProtocolName == 'RSync' )
      {
          IntProtSetSource.datafields = [
            { name: 'Name', type: 'string' },
            { name: 'LibraryComboIndex', map: 'LibraryComboIndex', type: 'number' },
            { name: 'port', map: 'port', type: 'number' },
          ]
      }

      else if (LBaseProtocolName == 'Glacier' )
      {
          IntProtSetSource.datafields = [
            { name: 'Name', type: 'string' },
            { name: 'Vault', map: 'Vault', type: 'string' },
            { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
            { name: 'login', map: 'login', type: 'string' },
            { name: 'Password', map: 'Password', type: 'string' },
            { name: 'RegionComboIndex', map: 'RegionComboIndex', type: 'number' },
          ]
      }

      else if (LBaseProtocolName == 'HTTP' )
      {
          IntProtSetSource.datafields = [
              { name: 'Name', type: 'string' },
              { name: 'url', map: 'url', type: 'string' },
              { name: 'port', map: 'port', type: 'number' },
              { name: 'InternetFolder', map: 'InternetFolder', type: 'string' },
              { name: 'login', map: 'login', type: 'string' },
              { name: 'Password', map: 'Password', type: 'string' },
              { name: 'HTML_download_and_parse', map: 'HTML_download_and_parse', type: 'boolean' },
              { name: 'HTML_parsing_limit', map: 'HTML_parsing_limit', type: 'number' },
              { name: 'HTML_enquire_timestamp', map: 'HTML_enquire_timestamp', type: 'boolean' },
              { name: 'HTML_enquire_precise_info', map: 'HTML_enquire_precise_info', type: 'boolean' },
              { name: 'HTML_download_default_pages', map: 'HTML_download_default_pages', type: 'boolean' },
              { name: 'HTML_consider_locally_existing_files', map: 'HTML_consider_locally_existing_files', type: 'boolean' },
              { name: 'HTML_assume_local_files', map: 'HTML_assume_local_files', type: 'boolean' },
              { name: 'HTML_avoid_re_downloading', map: 'HTML_avoid_re_downloading', type: 'boolean' },
              { name: 'HTML_LinksAboveComboIndex', map: 'HTML_LinksAboveComboIndex', type: 'number' },
              { name: 'HTML_LinksToOtherDomainsComboIndex', map: 'HTML_LinksToOtherDomainsComboIndex', type: 'number' },
              { name: 'adv_http_retries', map: 'adv_http_retries', type: 'number' },
              { name: 'Version_Group', map: 'Version_Group', type: 'string' },
            ]
        }

   // common fields

   IntProtSetSource.datafields.push( { name: 'adv_replace_characters', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbReplaceColons', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbUploadUpperCase', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbUploadLowerCase', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbAutomatic', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbAutomaticWinCompatible', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_cbCustomReplacements', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'adv_CustomReplacementsOtherSide', type: 'string' });
   IntProtSetSource.datafields.push( { name: 'adv_CustomReplacementsServerSide', type: 'string' });
   IntProtSetSource.datafields.push( { name: 'timeout', map: 'timeout', type: 'number' });
   IntProtSetSource.datafields.push( { name: 'retries', map: 'retries', type: 'number' });
   IntProtSetSource.datafields.push( { name: 'proxy_type', map: 'proxy_type', type: 'number' });
   IntProtSetSource.datafields.push( { name: 'proxy_host', map: 'proxy_host', type: 'string' });
   IntProtSetSource.datafields.push( { name: 'proxy_port', map: 'proxy_port', type: 'number' });
   IntProtSetSource.datafields.push( { name: 'proxy_login', map: 'proxy_login', type: 'string' });
   IntProtSetSource.datafields.push( { name: 'proxy_password', map: 'proxy_password', type: 'string' });
   IntProtSetSource.datafields.push( { name: 'recursive_listing', map: 'recursive_listing', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'AvoidChangesAPIInitialListing', map: 'AvoidChangesAPIInitialListing', type: 'boolean' });
   IntProtSetSource.datafields.push( { name: 'allow_ipv6', map: 'allow_ipv6', type: 'boolean' });
}


function DeleteProfile()
{
    var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
    var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < rowscount)
    {
      var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedrowindex ).Name;
      if (confirm('Delete profile '+ SelectedProfile +'?'))
      {


        var sendparams = { };
        sendparams.ProfileName = SelectedProfile.trim();
        sendparams.token = GClientToken;
        var json = JSON.stringify(sendparams);
        $.post( "post_deleteprofile.php", json ).done(function( data )
        {
            if (data == 'Deleted' )
            {
                var commit = $("#jqxgrid").jqxGrid('deleterow', selectedrowindex);
                $('#jqxgrid').jqxGrid('updatebounddata');
            }
            else
            {
                alert("profile '" + SelectedProfile + "' could not be deleted: "+data);
            }
        });

      }
    }
};

function StartScheduler()
{
   var sendparams = { };
   sendparams.token = GClientToken;
   var json = JSON.stringify(sendparams);
   $.post( "post_runscheduler.php", json ).done(function( data )
   {
      if (data == 'OK' )
      {
        $('#start_scheduler_button').jqxButton( 'val', 'Stop Scheduler' );
      }
      else
         alert( 'Scheduler not started: ' +data);
   });
};

function StopScheduler()
{

   var sendparams = { };
   sendparams.token = GClientToken;
   var json = JSON.stringify(sendparams);
   $.post( "post_stopscheduler.php", json ).done(function( data )
   {
      if (data == 'OK' )
      {
         $('#start_scheduler_button').jqxButton( 'val', 'Start Scheduler' );
      }
      else
         alert( 'Scheduler not stopped: ' +data);
   });

};

function RunSelectedProfile(attended)
{
     var selectedRow = $('#jqxgrid').jqxGrid('getselectedrowindex');
     if (selectedRow == -1 )
     {
       alert('Please select a profile to run');
       return;
     }
     var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedRow ).Name;

     var sendparams = { };
     sendparams.ProfileName = SelectedProfile.trim();
     sendparams.token = GClientToken;
     sendparams.attended = attended;
     var json = JSON.stringify(sendparams);

     $.post( "post_runprofile.php", json ).done(function( data )
     {
       if (data == 'OK' )
       {
         $("#jqxgrid").jqxGrid('setcellvalue', selectedRow, 'Progress', '<b>Starting...</b>');
         GLastProfileStartedAt=GetTickCount();
         GProfileListChanged=true; // make sure this "Starting..." is replaced with actual progress or result
       }
       else
       {
          alert( "Profile could not be started: " + data);
       }
     });
};

function StopSelectedProfile()
{

   var selectedRow = $('#jqxgrid').jqxGrid('getselectedrowindex');
   if (selectedRow == -1 ) return;
   var SelectedProfile = $('#jqxgrid').jqxGrid('getrowdata', selectedRow ).Name;

   var sendparams = { };
   sendparams.ProfileName = SelectedProfile.trim();
   sendparams.token = GClientToken;
   var json = JSON.stringify(sendparams);

   $.post( "post_stopprofile.php", json ).done(function( data )
   {
     if (data == 'OK' )
     {
       $("#jqxgrid").jqxGrid('setcellvalue', selectedRow, 'Progress', '<b>Stopping...</b>');
       GProfileListChanged=true; // make sure this "Starting..." is replaced with actual progress or result
     }
     else
     {
        alert( "Profile could not be stopped: " + data);
     }
   });
}


function SetSmartTrackingGlobalVariablesFromFilesTab()
{
    if (GbTabFiles) // "Files" tab sheet created?
    {
      if ($("#jqxFilesDetectMovedFilesCb").jqxCheckBox('val') == true)
      {
         if ($("#Files_Automatic_Radio_Mode").jqxRadioButton('val'))
            GSmartTrackingMoveSettingsWidget = "Smt_Moved_Fully_Automatic_Mode";
         else
            if ($("#Files_Left_Radio_Mode").jqxRadioButton('val'))
               GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Left_Mode";
            else
               GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Right_Mode";
      }
      else
         GSmartTrackingMoveSettingsWidget = "Smt_Moved_Off_Mode";
      //alert("Setting moved radio to "+GSmartTrackingMoveSettingsWidget);
    }
    else
    {
       if (GSmartTrackingMoveSettingsWidget!="Smt_Moved_Off_Mode")
       {
           var l2r=$("#jqxLeftToRightCb").jqxCheckBox('val');
           var r2l=$("#jqxRightToLeftCb").jqxCheckBox('val');
           if (l2r)
              if (r2l)
              {
                 // two-way, the only instance where the user really has a choice
                 if (GSmartTrackingMoveSettingsWidget=="")
                    GSmartTrackingMoveSettingsWidget = "Smt_Moved_Fully_Automatic_Mode";
              }
              else
                 GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Right_Mode";
           else
              GSmartTrackingMoveSettingsWidget = "Smt_Moved_Adjust_On_Left_Mode";
       }
    }
}


function SetFilesTabFromSmartTrackingGlobalVariables()
{
   reg_jqxFilesDetectMovedFilesCb.value = (GSmartTrackingMoveSettingsWidget != "Smt_Moved_Off_Mode");

   var AVal;
   if (GSmartTrackingMoveSettingsWidget=="Smt_Moved_Fully_Automatic_Mode")
      AVal = "Files_Automatic_Radio_Mode";
   else
      if (GSmartTrackingMoveSettingsWidget=="Smt_Moved_Adjust_On_Left_Mode")
         AVal = "Files_Left_Radio_Mode";
      else
         AVal = "Files_Right_Radio_Mode";

   reg_FilesDetectMovedFilesRadiogroupWidget.value = AVal;

   if (GbTabFiles) // "Files" tab sheet created?
   {
      $("#jqxFilesDetectMovedFilesCb").jqxCheckBox('checked',reg_jqxFilesDetectMovedFilesCb.value);

      reg_FilesDetectMovedFilesRadiogroupWidget.setfunc(AVal);
   }
}


function SetFilesDeletionsTabFromSmartTrackingGlobalVariables()
{
  reg_jqxFilesDeletions_MoveFilesToSFolder.value = (GSmartTrackingDeletedSettingsWidget=="Smt_Deleted_Move_IntoFolder_Mode");

  if (GbTabFilesDeletions) // if tab created
     $("#jqxFilesDeletions_MoveFilesToSFolder").jqxCheckBox('checked',reg_jqxFilesDeletions_MoveFilesToSFolder.value);
}

function ConstructURL(prefix,server,folder)
{
  if (!server.includes("://"))
     server=prefix+server;

  var serverendswithslash=server.slice(-1)=='/';

  var folderstartswithslash=(folder>'') && (folder[0]=='/');

  if (serverendswithslash)
     if (folderstartswithslash)
        return server+folder.substring(1);
     else
        return server+folder;
  else
     if (folderstartswithslash)
        return server+folder;
     else
        return server+'/'+folder;
}

function StoragePathFromControls(ProtocolName,ignoreerrors)
{
    var LBaseProtocolName = GetBaseProtocolName(ProtocolName);

    var thefolder=$('#inptInternetFolder').jqxInput('val');

    GIntProtAbsolutePath = (thefolder>'') && (thefolder[0]=='/');

    if (LBaseProtocolName == 'FTP')
    {
       return ConstructURL('ftp://',$('#FTP_url').jqxInput('val' ),thefolder);
    }
    else if (LBaseProtocolName == 'SMB')
    {
       return ConstructURL('smb://',$('#SMB_url').jqxInput('val' ),thefolder);
    }
    else if (LBaseProtocolName == 'SSH')
    {
       return ConstructURL('sftp://',$('#SSH_url').jqxInput('val' ),thefolder);
    }
    else if (LBaseProtocolName == 'WebDAV')
    {
       return ConstructURL('https://',$('#WebDAV_url').jqxInput('val' ),thefolder);
    }
    else if (LBaseProtocolName == 'Amazon S3')
    {
        var LContainer=$('#AmazonS3_bucket').jqxInput('val');
        if (!ignoreerrors && (!LContainer || (LContainer="")))
        {
           alert("Bucket field must not be empty");
           return undefined;
        }
        return ConstructURL('S3://',$('#AmazonS3_bucket').jqxInput('val'),thefolder);
    }
    else if (ProtocolName=='Google Drive')
    {
       var LContainer=$('#Container').jqxInput('val');
       if (!LContainer || LContainer=="")
       {
          LContainer = "Google Drive";
          $('#Container').jqxInput('val',LContainer)
       }
       return ConstructURL('ext://',LContainer,thefolder);
    }
    else if (LBaseProtocolName == 'GDriveAlike')
    {
       return ConstructURL('ext://',ProtocolName,thefolder);
    }
    else if (LBaseProtocolName == 'GDriveAlikeWithContainer')
    {
       var LContainer=$('#Container').jqxInput('val');
       if (LContainer=='')
          LContainer=ProtocolName;
       return ConstructURL('ext://',LContainer,thefolder);
    }
    else if (LBaseProtocolName == 'Azure')
    {
        var LContainer=$('#Azure_container').jqxInput('val');
        if (!ignoreerrors && (!LContainer || (LContainer="")))
        {
           alert("Container field must not be empty");
           return undefined;
        }
       if (ProtocolName=='Azure')
          return ConstructURL('AZ://',$('#Azure_container').jqxInput('val'),thefolder);
       else
          return ConstructURL('ext://',$('#Azure_container').jqxInput('val'),thefolder);
    }
    else if (LBaseProtocolName == 'Sharepoint')
    {
        var LContainer=$('#Sharepoint_domain').jqxInput('val');
        if (!LContainer || (LContainer=""))
        {
           alert("Sharepoint domain field must not be empty");
           return undefined;
        }
        return ConstructURL('ext://',$('#Sharepoint_domain').jqxInput('val'),thefolder);
    }
    else if (LBaseProtocolName == 'RSync')
    {
        return ConstructURL('rsync://',$('#Rsync_url').jqxInput('val'),thefolder);
    }
    else if (LBaseProtocolName == 'Glacier')
    {
        var LContainer=$('#Glacier_Vault').jqxInput('val');
        if (!ignoreerrors && (!LContainer || (LContainer="")))
        {
           alert("Glacier vault field must not be empty");
           return undefined;
        }
        return ConstructURL('GL://',$('#Glacier_Vault').jqxInput('val'),thefolder);
    }
    else if (LBaseProtocolName == 'HTTP')
    {
        return ConstructURL('https://',$('#HTTP_url').jqxInput('val'),thefolder);
    }

}


