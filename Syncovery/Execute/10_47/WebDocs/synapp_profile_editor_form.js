'use strict';

//Globals
var GSelectedDirStr = "";
var GCurrentProfileAction = "";

var GInternetProtocolSetLEFTRegistryList = new Array();
var GInternetProtocolSetRIGHTRegistryList = new Array();
var GInternetProtocolSetADDDESTRegistryList = new Array();

// Real-Time settings Dialog
var GRunCompletelyOnceCb = false;
var GRealtimeFolderMode = false;
var GRealTimeDeletions = false;
var GRealTimeDeletionsSafetyDelay = 0;
var GRealTimeRenames = false;
var GRealTimeIgnoreTempFiles = false;
var GRealtimeDelaySeconds = 0;
var GFullRunBasedOnItemCount = 0;
var GFullRunBasedOnTimeSeconds = 0;

// new in V9
var GRealtimeCheckFTPForChanges = false;
var GUseFTPChangesTechniqueForLeftSide = false;
var GUseFTPChangesTechniqueForRightSide = false;
var GFTPChangesCheckIntervalSeconds = 0;

// Tab Files->Deletion ->FoldersForDeletedFiles Dlg
var GMoveDeletedFilesIntoFolderL = "";
var GMoveDeletedFilesIntoFolderR = "";

var GInternetSettingsListloaded = false;

// Tab Special
var HTML_CacheDestinationFileListDlg = "";
var GSpecial_DoubleCheckCacheHoles = false;
var GSpecial_RefreshCacheEvery = 0;
var GSpecial_CacheNotRefreshedCounter = 0;

var HTML_PascalScriptDlg =
'<div id="jqxPascalScriptDlg">'+
'<div>PascalScript</div>'+
'<div> '+
'<table align="left" style="margin: 0px auto;">'+
'<tr>'+
'  <td valign="top">'+
'   <br/>'+
'     <div>PascalScript</div><br>'+
'     <textarea style="margin-left: 10px;" id="inptPascalScript"></textarea><br/><br/>'+
'  </td>'+
'</tr>'+
'<tr>'+
'  <td valign="bottom">'+
'      <div  style="float: none;">'+
'         <div style="float: none;">'+
'             <button id="PascalScript_OK_btn">OK</button>'+
'              <button id="PascalScript_Cancel_btn">Cancel</button>'+
'          </div>'+
'      </div>'+
'  </td>'+
'</tr>'+
'</table>'+

'</div>'+

'</div>';


//
      
var GCurrentLeftRightEdit = null;
var GCurrentLeftRightRawURL = "";
var GProtocolName = "";
var GCurrentUsername = "";
var GCurrentPassword = "";

function DoInternetSettingsDialog( ProfileName, InternetProtocolRegistryList, LeftOrRight,
                                   ProtocolName, LeftRightEdit,
                                   LeftRightRawURL,
                                   AUsername,APassword,
                                   DefaultSMB )
{
   GProtocolName = ProtocolName;
     if ((GProtocolName==undefined) || (GProtocolName=="") || (GetBaseProtocolName(GProtocolName)==''))
        if (DefaultSMB)
           GProtocolName = "SMB";
        else
           GProtocolName = "FTP";
    GCurrentList = InternetProtocolRegistryList;
    GCurrentLeftRightEdit = LeftRightEdit;
    GCurrentLeftRightRawURL = LeftRightRawURL;
    GCurrentUsername = AUsername;
    GCurrentPassword = APassword;
    if (!GCurrentList[indexOfListLoaded].ListLoaded)
    {
   //    GCurrentList = deepCopy( GInternetProtocolSetRegistryList );  //GInternetProtocolSetRegistryList.slice();//

        if (!ProfileName || (ProfileName=="") || (LeftOrRight=="adddest"))
        {
           GCurrentLeftRightRawURL = "";
           LoadDefaultsToRegistryList( GCurrentList, true );
           if (LeftOrRight=="adddest")
           {
              // alert("Loading GAddDestFTPSettings: "+ JSON.stringify(GAddDestFTPSettings));
              LoadRecordToRegistryList(GAddDestFTPSettings,GCurrentList,GetBaseProtocolName(GProtocolName));
           }
           InitProtocolSettingsForm( ProfileName, GCurrentList, LeftOrRight, GProtocolName, GCurrentLeftRightEdit, GCurrentLeftRightRawURL );
           GCurrentList[indexOfListLoaded].ListLoaded = true;

           // **** DEFAULT TIMEOUT AND RETRIES FROM GLOBAL VARS ****

           if ($('#adv_timeout').length)
              $('#adv_timeout').jqxFormattedInput('val',GIPTimeout);
           if ($('#adv_retries').length)
              $('#adv_retries').jqxFormattedInput('val',GIPRetries);

           // OTHER GLOBALS TOO?
           //- GDOCS
         }
        else
        {
          // normal case when editing a profile
          InitProtocolSettingsDatasource( GIntProtSetSource, ProfileName, LeftOrRight, GProtocolName);

          var IntProtSetDataAdapter = new $.jqx.dataAdapter(GIntProtSetSource,

          { loadComplete: function ()
              {
                // get data records.
                if (IntProtSetDataAdapter.xhr.responseText == '{"error":"session_timeout"}' )
                {
                   window.location = '/index.html';
                   return;
                }
                else if ( IntProtSetDataAdapter.xhr.responseText == '{"error":"session_busy"}' )
                {
                   window.location = '/post_session_busy.php';
                   return;
                }

                if (IntProtSetDataAdapter.records.length == 1)
                {
                  var record = IntProtSetDataAdapter.records[0];
                  LoadRecordToRegistryList(record, GCurrentList, GetBaseProtocolName(GProtocolName));
                }
                else
                {
                  //alert('Protocol ' + GProtocolName + ' is not supported in Web Interface yet. Sorry.');
                  //GProtocolName = "FTP";
                  GCurrentLeftRightRawURL = "";
                  LoadDefaultsToRegistryList( GCurrentList, true );
                }
                InitProtocolSettingsForm( ProfileName, GCurrentList, LeftOrRight, GProtocolName, GCurrentLeftRightEdit, GCurrentLeftRightRawURL );
                GCurrentList[indexOfListLoaded].ListLoaded = true;

              }
              ,
              loadError: function (jqXHR, status, error) {

                  if (error == "")
                    alert("Error. Connection with server might be lost.");
                  else
                    alert(error);

               }
           });

           IntProtSetDataAdapter.dataBind();
        }
     }
     else 
       InitProtocolSettingsForm( ProfileName, GCurrentList, LeftOrRight, GProtocolName, GCurrentLeftRightEdit, GCurrentLeftRightRawURL );
}

function DoSMBDialog(ProfileName,RightSide,inputField,StoredPath)
{
  if (RightSide)
     DoInternetSettingsDialog(ProfileName,
                              GInternetProtocolSetRIGHTRegistryList,
                              "right",
                              GRightProtocolName,
                              inputField,
                              StoredPath,
                              GRightUsername,
                              GRightPassword,
                              true); // default to SMB
  else
     DoInternetSettingsDialog(ProfileName,
                              GInternetProtocolSetLEFTRegistryList,
                              "left",
                              GLeftProtocolName,
                              inputField,
                              StoredPath,
                              GLeftUsername,
                              GLeftPassword,
                              true); // default to SMB
 }

function ShowPascalScriptDlg(event)
{
  if ($("#jqxPascalScriptCb").jqxCheckBox( 'disabled'))
     return;

  if (!GAllowPascalScript)
  {
     alert('PascalScript is not supported on this CPU type.');
     $("#jqxPascalScriptCb").jqxCheckBox( 'val',  GUsePascalScript );
     return;
  }

  $("#HTML_PascalScriptDlg_div").html( HTML_PascalScriptDlg );
  $('#jqxPascalScriptDlg').jqxWindow({ maxWidth: 10000,  width: 1400, maxHeight:10000, height:1000,
                                       autoOpen: false, isModal: true,
                                       theme: 'energyblue', animationType: 'slide',
                                       draggable: !GIsTabletApplication });

  $("#inptPascalScript").jqxInput({ width: 720, height: 450});
  if (GUsePascalScript)
     $("#inptPascalScript").jqxInput('val', GPascalScript);
  else
     $("#inptPascalScript").jqxInput('val','');

  $('#PascalScript_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
  $('#PascalScript_OK_btn').click(function ()
  {

     GPascalScript = $("#inptPascalScript").jqxInput('val');
     GUsePascalScript = (GPascalScript!='');
     $('#jqxPascalScriptDlg').jqxWindow('close');

  });

  $('#PascalScript_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
  $('#PascalScript_Cancel_btn').click(function () {
      $('#jqxPascalScriptDlg').jqxWindow('close');
  });

  $('#jqxPascalScriptDlg').on('close',
      function (event)
      {
        $("#jqxPascalScriptCb").jqxCheckBox( 'val',  GUsePascalScript );
      });

  $('#jqxPascalScriptDlg').jqxWindow('open');

};

function InitProfileEditorForm( ProfileName, CurrentProfileAction )
{
 showstatusmessage("Initializing Editor Form");
 try
 {
   GSelectedProfileName = ProfileName;
   GCurrentProfileAction = CurrentProfileAction;


   // now in synappglobals.js
   // GetHTMLintoVar('SmartTrackingSettingsDlg.html', 'HTML_SmartTrackingSettingsDlg');
   // GetHTMLintoVar('ExactMirrorSettingsDlg.html', 'HTML_ExactMirrorSettingsDlg');
   // GetHTMLintoVar('MoveSettingsDlg.html', 'HTML_MoveSettingsDlg');

   $("#ProfileEditorForm_div").html( ProfileEditorFormHTML );

  //make Tabs header higher for Tablet version
  if (false && GIsTabletApplication)
  {
      // this no longer works
      var MainLis = '<ul><li></br>Schedule</br></li>'+
     '<li></br>Access/Retries</br></li>'+
     '<li></br>Comparison</br></li>'+
     '<li></br>Files</br></li>'+
     '<li></br>Folders</br></li>'+
     '<li></br>Job</br></li>'+
     '<li></br>Masks/Filters</br></li>'+
     '<li></br>Safety</br></li>'+
     '<li></br>Special</br></li>'+
     '<li></br>Versioning</br></li>'+
     '<li></br>Compress/Encrypt</br></li>'+
    $("#TabMainLis").replaceWith(MainLis);

    var TabsScheduleLis =
    '<ul><li></br>Schedule</br></li>'+
          '<li></br>More</br></li>'+
          '<li></br>Weekdays and Time window</br></li>'+
          '<li></br>Monitoring/Realtime sync</br></li></ul>';
    $("#TabsScheduleLis").replaceWith(TabsScheduleLis);
  }

   // Tab Control
   var bFoldersTabCreated = false;
   var bJobTabCreated = false;
   var bTabInformationCreated = false;
   var bScheduleTabCreated = false;
   var bScheduleMoreTabCreated = false;
   var bScheduleWeekdaysTabCreated = false;
   var bSheduleMonitoringTabCreated = false;
   var bTabsAccessAndRetriesCreated = false;
   var bTabsAccessWaitingCreated = false;
   GbTabsComparisonCreated = false;
   GbTabsComparisonMoreCreated = false;
   GbTabFiles = false;
   GbTabFilesDeletions = false;
   Gb_TabSpecial = false;
   var bTabFilesMore = false;
   var bTabsMasksAndFilters = false;
   var bTabsMasksAndFiltersExclusionMasks = false;
   var bTabsMasksAndFiltersFileAge = false;
   var bTabsMasksAndFiltersGeneralFilters = false;
   var bTabsSafety = false;
   var bTabsSafetySafety = false;
   var bTabsSafetyUnattended = false;
              
   var bTabsSpecialDatabase = false;
   var bTabsVersioning = false;
   var bTabsVersioningSynthetic = false;
   var bTabsVersioningMore =  false;
   var bTabsZip = false;
   var bTabsZipEncrypt = false;
              
     //initTabContent: initWidgets
     $('#jqxTabs').jqxTabs({ width: GProfileSettingsTabControlWidth, height: GProfileSettingsTabControlHeight + 40,
       keyboardNavigation: false,  initTabContent:


 //var initWidgets =
   function(tab)
   {
                    
       switch (tab) {
       case 0:
           $('#jqxTabsSchedule').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false });
           //alert('Tab Schedule');
           if (bScheduleTabCreated == false)
           {
             LoadRegistryItemToControlByName('jqxScheduleThisProfileCb');
             LoadRegistryItemToControlByName('jqxRun_Every_Day_Time_Input');
             $("#Run_Every_Day_Radio_Mode").jqxRadioButton({});
             $("#Repeat_after_Radio_Mode").jqxRadioButton({});
             $("#Repeat_monthly_Radio_Mode").jqxRadioButton({});
             $("#Run_only_Once_Radio_Mode").jqxRadioButton({});
             LoadRegistryItemToControlByName('RunModeRadiogroupWidget');

             LoadRegistryItemToControlByName('inptScheduleDays');
             LoadRegistryItemToControlByName('inptScheduleHours');
             LoadRegistryItemToControlByName('inptScheduleMinutes');
             LoadRegistryItemToControlByName('inptScheduleSec');


             LoadRegistryItemToControlByName('jqxSpecifyNextRunCb');
             LoadRegistryItemToControlByName('jqxIntervalSpecificationCb');
             LoadRegistryItemToControlByName('jqxNextRunDay_Input');
             LoadRegistryItemToControlByName('jqxNextRunTime_Input');
                          
             bScheduleTabCreated = true;
           }
           $('#jqxTabsSchedule').on('selecting', function (event)
           { // Some code here.
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
               ////Schedule
                  //initialized above
              }
              else if ((ItemIndex == 1) && (bScheduleMoreTabCreated == false))
              {
                 ////Schedule More
                 if (GisSyncoveryWindows)
                    LoadRegistryItemToControlByName('jqxScheduleRunUponLogOutCb');
                 else
                 {
                    $('#jqxScheduleRunUponWinLoginCb').html("Run Upon Scheduler Start (System Boot)");
                    $('#jqxScheduleRunUponLogOutCb').css({"display":"none"});
                 }
                 LoadRegistryItemToControlByName('jqxScheduleRunUponWinLoginCb');
                 LoadRegistryItemToControlByName('jqxScheduleRunUponShutdownOrRebootCb');

                 LoadRegistryItemToControlByName('jqxScheduleRunMissedDaylyJobCb');
                 LoadRegistryItemToControlByName('jqxScheduleAddRandomDelayUpToCb');
                 LoadRegistryItemToControlByName('jqxAddRandomDelay_Time_Input');
                 LoadRegistryItemToControlByName('jqxScheduleWarnIfProfileNotRunForCb');
                 LoadRegistryItemToControlByName('jqxWarnIfProfileNotRunFor_Time_Input');

                 LoadRegistryItemToControlByName('jqxUseAdditionalTimes1Cb');
                 LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input1');
                 LoadRegistryItemToControlByName('jqxUseAdditionalTimes2Cb');
                 LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input2');
                 LoadRegistryItemToControlByName('jqxUseAdditionalTimes3Cb');
                 LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input3');
                 LoadRegistryItemToControlByName('jqxUseAdditionalTimes4Cb');
                 LoadRegistryItemToControlByName('jqxAdditionalTimes_Time_Input4');
                 bScheduleMoreTabCreated = true;
                              
              }
              else if ((ItemIndex == 2) && (bScheduleWeekdaysTabCreated == false))
              {

                //Schedule weekdays

                 LoadRegistryItemToControlByName('jqxMondayCb');
                 LoadRegistryItemToControlByName('jqxTuesdayCb');
                 LoadRegistryItemToControlByName('jqxWednesdayCb');
                 LoadRegistryItemToControlByName('jqxThursdayCb');
                 LoadRegistryItemToControlByName('jqxFridayCb');
                 LoadRegistryItemToControlByName('jqxSaturdayCb');
                 LoadRegistryItemToControlByName('jqxSundayCb');
                 LoadRegistryItemToControlByName('jqxRunOnlyBetweenCb');
                 LoadRegistryItemToControlByName('jqxRunOnlyMinTime_Input');
                 LoadRegistryItemToControlByName('jqxRunOnlyMaxTime_Input');
                 LoadRegistryItemToControlByName('jqxIgnoreTimeWindowOnWeekendsCb');
                 LoadRegistryItemToControlByName('jqxStopRunningProfilesCb');
                 LoadRegistryItemToControlByName('jqxInterruptMiddleOfFileCb');
                 bScheduleWeekdaysTabCreated = true;
                              
              }
              else if ((ItemIndex == 3) && (bSheduleMonitoringTabCreated == false))
              {

               //Schedule Monitoring/Real-Time Sync
                 LoadRegistryItemToControlByName('jqxRealTimeSynchronizationCb');
                 LoadRegistryItemToControlByName('jqxRealContinuousSyncCb');
                 $("#btnRealTimeSettings").jqxButton({ theme: 'energyblue' });
                 $('#btnRealTimeSettings').click(function () {

                     var client = new XMLHttpRequest();
                     client.open('GET', '/RealTimeSettingsDlg.html');
                     client.onreadystatechange = function()
                     {
                        if (client.readyState == XMLHttpRequest.DONE)
                        {
                           HTML_RealTimeSettingsDlg = client.responseText;
                           $("#HTML_RealTimeSettingsDlg_div").html( HTML_RealTimeSettingsDlg );
                           setTimeout(ShowRealTimeSettingsDlg, 100);
                        }
                     }
                     client.send();

                 });
                 LoadRegistryItemToControlByName('jqxRealProfileAsSoonAsDriveAvailableCb');
                 $("#Real_Once_Mode").jqxRadioButton({groupName :"Real_MonitoringRunOnlyOnceWidget"});
                 $("#Real_Repeatedly_Mode").jqxRadioButton({groupName :"Real_MonitoringRunOnlyOnceWidget"});
                 LoadRegistryItemToControlByName('Real_MonitoringRunOnlyOnceWidget');
                 LoadRegistryItemToControlByName('jqx_RealMonitoringIntervalMinutes');
                 LoadRegistryItemToControlByName('jqx_RealMonitoringIntervalSeconds');
                 LoadRegistryItemToControlByName('jqxRealUseMinimumPauseCb');
                 LoadRegistryItemToControlByName('jqx_RealPauseHoursInput');
                 LoadRegistryItemToControlByName('jqx_RealPauseMinutesInput');
                 LoadRegistryItemToControlByName('jqx_RealPauseSecondsInput');

                 bSheduleMonitoringTabCreated = true;
              };

                           
              EnableDisableRealProfileAsSoonAsDriveAvailable();
              ScheduleTabControlsEnableDisable();
           });
           ScheduleTabControlsEnableDisable();
           break;
       case 1:
           $('#jqxTabsAccessAndRetries').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
               // alert('Tab AccessAndRetries');
                //Access & Retries-> File Access
              if (!bTabsAccessAndRetriesCreated)
              {
                if (GisSyncoveryWindows)
                {
                    $("#Do_not_Use_Radio_Mode").jqxRadioButton({groupName :"VolumeShadowingRadiogroupWidget"});
                    $("#Use_to_copy_locked_files_Radio_Mode").jqxRadioButton({groupName :"VolumeShadowingRadiogroupWidget"});
                    $("#Use_for_all_files_Radio_Mode").jqxRadioButton({groupName :"VolumeShadowingRadiogroupWidget"});
                    $("#Use_for_all_Create_Radio_Mode").jqxRadioButton({groupName :"VolumeShadowingRadiogroupWidget"});
                    LoadRegistryItemToControlByName('VolumeShadowingRadiogroupWidget');
                }
                else
                {
                    $('#VolShad_lbl').css({"display":"none"});
                    $('#Do_not_Use_Radio_Mode').css({"display":"none"});
                    $('#Use_to_copy_locked_files_Radio_Mode').css({"display":"none"});
                    $('#Use_for_all_files_Radio_Mode').css({"display":"none"});
                    $('#Use_for_all_Create_Radio_Mode').css({"display":"none"});
                }
                LoadRegistryItemToControlByName('jqxFAIgnoreAccessDeniedFoldersCb');
                LoadRegistryItemToControlByName('jqxFAIgnoreAccessDeniedFilesCb');
                LoadRegistryItemToControlByName('jqxFAIgnoreMissingFilesCb');
                LoadRegistryItemToControlByName('jqxFAIgnoreLockedFilesOnDestCb');
                LoadRegistryItemToControlByName('jqxFAIgnoreDeletionErrorsCb');
                LoadRegistryItemToControlByName('jqxFAIgnoreDeletingFolderErrorsCb');
                LoadRegistryItemToControlByName('jqxFADatabaseSafeCopyCb');
                LoadRegistryItemToControlByName('jqxFATakeAdminOwnershipCb');
                LoadRegistryItemToControlByName('jqxFAVerifyOpeningPriorCopyCb');
                bTabsAccessAndRetriesCreated = true;
              }

           $('#jqxTabsAccessAndRetries').on('selecting', function (event)
           {
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
                // initialized above
              }
              else if ((ItemIndex == 1) && (bTabsAccessWaitingCreated == false))
              {
                //Access & Retries-> Waiting & Retrying
                 LoadRegistryItemToControlByName('jqxWRWaitForFileAccessCb');
                 LoadRegistryItemToControlByName('inptWRWaitUpToMin');
                 LoadRegistryItemToControlByName('jqxWRWaitIfTransferProblemCb');
                 LoadRegistryItemToControlByName('jqxWRBuildingFileListCb');
                 LoadRegistryItemToControlByName('jqxWRRunningTheProfileCb');
                 $("#Re_Run_Once_Radio_Mode").jqxRadioButton({groupName :"WRReRunRadiogroupWidget"});
                 $("#Re_Run_Until_Success_Radio_Mode").jqxRadioButton({groupName :"WRReRunRadiogroupWidget"});
                 $("#Max_Re_Runs_Radio_Mode").jqxRadioButton({groupName :"WRReRunRadiogroupWidget"});
                 LoadRegistryItemToControlByName('WRReRunRadiogroupWidget');
                 LoadRegistryItemToControlByName('inptWRMaxReRuns');
                 LoadRegistryItemToControlByName('inptWRRetryAfter');
                 LoadRegistryItemToControlByName('jqxWRAvoidRerunDueToLockedCb');
                 bTabsAccessWaitingCreated = true;
              }
              EnableDisableWaitingAndRetrying();
           });
                         
           break;
       case 2:
           $('#jqxTabsComparison').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
            //Comparison
             // alert('Tab Comparison');
             if (!GbTabsComparisonCreated)
             {
              LoadRegistryItemToControlByName('jqxComparIgnoreSmallTimeDiffCb');
              LoadRegistryItemToControlByName('inptComparIgnoreSec');
              LoadRegistryItemToControlByName('jqxComparIgnoreExactHourTimeDiffCb');
              LoadRegistryItemToControlByName('inptComparIgnoreHours');
              LoadRegistryItemToControlByName('jqxComparIgnoreSecondsCb');
              LoadRegistryItemToControlByName('jqxComparIgnoreTimestampAlltogetherCb');
              LoadRegistryItemToControlByName('jqxComparAdjustTimestampOnlyCb');
              $("#Ask_Radio_Mode").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});
              $("#Copy_Left_To_Right_Radio_Mode").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});
              $("#Copy_Right_To_Left_Radio_Mode").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});
              $("#Copy_Larger_Files_Radio_Mode").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});
              $("#SizeDiffCopy").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});
              $("#SizeDiffIgnore").jqxRadioButton({groupName :"ComparWhenSizeIsDiffentRadiogroupWidget"});

              var l2r = GetCheckBoxValue("jqxLeftToRightCb");
              var r2l = GetCheckBoxValue("jqxRightToLeftCb");
              if (l2r == r2l)
                 ShowTwoWayRadios();
              else
                 ShowOneWayRadios();

              LoadRegistryItemToControlByName('ComparWhenSizeIsDiffentRadiogroupWidget');

              GbTabsComparisonCreated = true;

            };

           $('#jqxTabsComparison').on('selecting', function (event)
           {
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
                // initialized above
              }
              else if ((ItemIndex == 1) && (GbTabsComparisonMoreCreated == false))
              {
                 // Comparison->More
                 LoadRegistryItemToControlByName('jqxComparMoreAlwaysCopyFilesCb');
                 LoadRegistryItemToControlByName('jqxComparStripReadOnlyAttrCb');
                 LoadRegistryItemToControlByName('jqxComparMoreBinaryComparisonCb');
                 LoadRegistryItemToControlByName('jqxComparMoreBinCompRememberCb');
                 LoadRegistryItemToControlByName('jqxComparMoreBinaryLeftSideCb');
                 LoadRegistryItemToControlByName('jqxComparMoreBinaryRightSideCb');
                 LoadRegistryItemToControlByName('jqxComparMoreFileAttrCb');

                 if (GisSyncoveryWindows)
                 {
                    LoadRegistryItemToControlByName('jqxComparMoreFolderAttrCb');
                    LoadRegistryItemToControlByName('jqxComparMoreDetectHardLinksCb');
                 }
                 else
                 {
                    $('#jqxComparMoreFileAttrCb').css({"display":"none"});
                    $('#jqxComparMoreFolderAttrCb').css({"display":"none"});
                 }

                 LoadRegistryItemToControlByName('jqxComparMoreCaseSensitivityCb');
                 LoadRegistryItemToControlByName('jqxComparMoreFolderTimesCb');
                 LoadRegistryItemToControlByName('jqxComparMoreVerifySyncStatisticsCb');
                 LoadRegistryItemToControlByName('jqxComparMoreEnforceHardLinksCb');
                 GbTabsComparisonMoreCreated = true;
              }
             EnableDisableComparison();
           });
           EnableDisableComparison();
           break;
       case 3:
          $('#jqxTabsFiles').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
          if (GbTabFiles == false)
          {
            LoadRegistryItemToControlByName('jqxFilesDetectMovedFilesCb');
            $("#Files_Left_Radio_Mode").jqxRadioButton({groupName :"FilesDetectMovedFilesRadiogroupWidget"});
            $("#Files_Right_Radio_Mode").jqxRadioButton({groupName :"FilesDetectMovedFilesRadiogroupWidget"});
            $("#Files_Automatic_Radio_Mode").jqxRadioButton({groupName :"FilesDetectMovedFilesRadiogroupWidget"});
            LoadRegistryItemToControlByName('FilesDetectMovedFilesRadiogroupWidget');
            LoadRegistryItemToControlByName('jqxFilesDetectRenamedFilesCb');
            LoadRegistryItemToControlByName('jqxFilesVerifyCopiedFilesCb');
            LoadRegistryItemToControlByName('jqxFilesReCopyOnceCb');
            LoadRegistryItemToControlByName('jqxFilesAutomaticallyResumeCb');
            LoadRegistryItemToControlByName('jqxFilesProtectFromBeingReplacedCb');
            LoadRegistryItemToControlByName('jqxFilesDoNotScanDestinationCb');
            LoadRegistryItemToControlByName('inptFilesNumberToCopyInparallel');
            LoadRegistryItemToControlByName('jqxFilesBypassFileBufferingLeftCb');
            LoadRegistryItemToControlByName('jqxFilesBypassFileBufferingRightCb');
            LoadRegistryItemToControlByName('inptFilesSplitLargeFiles');
            GbTabFiles = true;
         }

          $('#jqxTabsFiles').on('selecting', function (event)
           {

              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {

              }
              else if ((ItemIndex == 1) && (GbTabFilesDeletions == false))
              {
                // Files Deletions

                if (GisSyncoveryLinux)
                {
                   $('#jqxFilesDeletions_RecycleBinExplainer').html("The Recycle Bin is only available on some cloud storages<br/>(not on local hard drives or mounted network shares).");
                }

                LoadRegistryItemToControlByName('jqxFilesDeletions_OverwrittenFiles');
                LoadRegistryItemToControlByName('jqxFilesDeletions_DeletedFiles');
                LoadRegistryItemToControlByName('jqxFilesDeletions_MoveFilesToSFolder');
                $("#btnFiles_EditPaths").jqxButton({ theme: 'energyblue' });
                $('#btnFiles_EditPaths').click(function () {
                                
                     var client = new XMLHttpRequest();
                     client.open('GET', '/FoldersForDeletedFiles.html');
                     client.onreadystatechange = function()
                     {
                        if (client.readyState == XMLHttpRequest.DONE)
                        {
                           HTML_FoldersForDeletedFilesDlg = client.responseText;
                           $("#HTML_FoldersForDeletedFilesDlg_div").html( HTML_FoldersForDeletedFilesDlg );
                           setTimeout(ShowFoldersForDeletedFilesDlg, 100);
                        }
                     }
                     client.send();

                 });
                LoadRegistryItemToControlByName('jqxFilesDeletions_DeleteOlderVersionsPermamently');
                LoadRegistryItemToControlByName('jqxFilesDeletions_RememberDeletionTime');
                LoadRegistryItemToControlByName('jqxFilesDeletions_DoubleCheckNonExistence');
                LoadRegistryItemToControlByName('jqxFilesDeletions_NeverDelete');
                LoadRegistryItemToControlByName('jqxFilesDeletions_DeleteBeforeCopying');

                GbTabFilesDeletions = true;

              }
             else if ((ItemIndex == 2) && (bTabFilesMore == false) )
              {
               //Files More
                if (GisSyncoveryWindows)
                   LoadRegistryItemToControlByName('jqxFilesMore_UseWindowsApi');
                LoadRegistryItemToControlByName('jqxFilesMore_CopyOnlyFilesPerRun');
                LoadRegistryItemToControlByName('inptFilesMore_FilesPerRun');
                LoadRegistryItemToControlByName('jqxFilesMore_CopyOnlyMBPerRun');
                LoadRegistryItemToControlByName('inptFilesMore_MBPerRun');
                LoadRegistryItemToControlByName('jqxFilesMore_SpeedLimit');
                LoadRegistryItemToControlByName('inptFilesMore_SpeedLimit');
                LoadRegistryItemToControlByName('jqxSpeedLimitAdvancedCb');
                GSpeedLimitAdvanced=GetCheckBoxValue('jqxSpeedLimitAdvancedCb');
                LoadRegistryItemToControlByName('jqxFilesMore_CopiedFilesSysTime');
                LoadRegistryItemToControlByName('jqxFilesMore_NeverReplace');
                LoadRegistryItemToControlByName('jqxFilesMore_DontAddAnyFiles');
                LoadRegistryItemToControlByName('jqxFilesMore_AlwaysAppend');
                LoadRegistryItemToControlByName('jqxFilesMore_IgnoreGlobalSpeedLimit');
                LoadRegistryItemToControlByName('jqxFilesMore_AlwaysConsider');
                LoadRegistryItemToControlByName('jqxFilesMore_AndCompareFileDetails');
                LoadRegistryItemToControlByName('jqxFilesMore_ViaInternetProtocolsToo');
                LoadRegistryItemToControlByName('jqxFilesMore_CheckDestinationFile');
                LoadRegistryItemToControlByName('jqxFilesMore_PreserveLastAccessOnSource');
                LoadRegistryItemToControlByName('jqxFilesMore_SkipIfFileSizeChanging');
                LoadRegistryItemToControlByName('jqxFilesMore_CreateLinksInsteadOfCopying');
                bTabFilesMore = true;
              }
              EnableDisableFiles();
           });
           EnableDisableFiles();
          break;
       case 6:
          $('#jqxTabsMasksAndFilters').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
           if (bTabsMasksAndFilters == false)
           {
             LoadRegistryItemToControlByName('inptInclusionMasks');
             LoadRegistryItemToControlByName('jqxMasks_SpecFolderMasksCb');
             LoadRegistryItemToControlByName('jqxMasks_RestrictionsCb');
             LoadRegistryItemToControlByName('jqxMasks_IncludeBackupFilesCb');
             bTabsMasksAndFilters = true;
           }
           $('#jqxTabsMasksAndFilters').on('selecting', function (event)
           {

              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
                 // Inclusion Masks
              }
              else if ((ItemIndex == 1) && (bTabsMasksAndFiltersExclusionMasks == false))
              {
                // Exclusion Masks
                $("#Masks_DontCopy_Radio_Mode").jqxRadioButton({groupName :"ExclucionFilesWidget"});
                $("#Masks_IgnoreTotaly_Radio_Mode").jqxRadioButton({groupName :"ExclucionFilesWidget"});
                LoadRegistryItemToControlByName('ExclucionFilesWidget');
                LoadRegistryItemToControlByName('inptExclusionMasks');
                LoadRegistryItemToControlByName('jqxMasks_UseGlobalExclAlsoCb');
                bTabsMasksAndFiltersExclusionMasks = true;
              }
              else if ((ItemIndex == 2) && (bTabsMasksAndFiltersGeneralFilters == false))
              {
                // General Filters
                LoadRegistryItemToControlByName('jqxMasks_ProcessHiddenFilesCb');
                LoadRegistryItemToControlByName('jqxMasks_SearchHiddenFoldersCb');

                if (GisSyncoveryWindows)
                {
                   $('#GeneralFiltersExplainer').css({"display":"none"});
                }
                else
                {
                   $('#jqxMasks_CopyFilesWithArchiveFlagCb').html("Copy Only Files That Have Not Previously Been Marked As Copied (or Have Changed Since)");
                   $('#jqxMasks_ClearArchiveFlagsCb').html("Mark Copied Files With an Extended Attribute");

                   $('#genfilrowxcol1').html($('#genfilrowxcol2').html());
                   $('#genfilrowxcol2').html("");
                }

                LoadRegistryItemToControlByName('jqxMasks_CopyFilesWithArchiveFlagCb');
                LoadRegistryItemToControlByName('jqxMasks_ClearArchiveFlagsCb');

                LoadRegistryItemToControlByName('cbRestoreDeletedItems');
                LoadRegistryItemToControlByName('cbSymlinkFilesLeft');
                LoadRegistryItemToControlByName('cbSymlinkFilesRight');
                LoadRegistryItemToControlByName('cbSkipOfflineFiles');
                LoadRegistryItemToControlByName('cbCopyPinnedFilesOnlyLeft');
                LoadRegistryItemToControlByName('cbCopyPinnedFilesOnlyRight');

                if (GisSyncoveryWindows)
                {
                   LoadRegistryItemToControlByName('jqxMasks_ProcessReparsePointsCb');
                   LoadRegistryItemToControlByName('jqxMasks_FollowJunctionPointsFilesCb');
                   LoadRegistryItemToControlByName('jqxMasks_FollowJunctionPointsFoldersCb');
                   LoadRegistryItemToControlByName('jqxMasks_CopyOtherReparsePointsCb');

                   $('#SymLinksSpacer').css({"display":"none"});
                   $('#SymLinksFilesRow').css({"display":"none"});
                   $('#SymLinksFoldersRow').css({"display":"none"});
                }
                else
                {
                   $('#jprow1').css({"display":"none"});
                   $('#jprow2').css({"display":"none"});
                   $('#jprow3').css({"display":"none"});
                   $("#SymLinksFilesIgnore").jqxRadioButton({groupName :"SymLinksFiles"});
                   $("#SymLinksFilesFollow").jqxRadioButton({groupName :"SymLinksFiles"});
                   $("#SymLinksFilesCopy").jqxRadioButton({groupName :"SymLinksFiles"});
                   $("#SymLinksFoldersIgnore").jqxRadioButton({groupName :"SymLinksFolders"});
                   $("#SymLinksFoldersFollow").jqxRadioButton({groupName :"SymLinksFolders"});
                   $("#SymLinksFoldersCopy").jqxRadioButton({groupName :"SymLinksFolders"});
                   LoadRegistryItemToControlByName('SymLinksFiles');
                   LoadRegistryItemToControlByName('SymLinksFolders');
                }
                bTabsMasksAndFiltersGeneralFilters = true;
              }
              else if ((ItemIndex == 3) && (bTabsMasksAndFiltersFileAge == false))
              {
                // File Age and Size
                LoadRegistryItemToControlByName('jqxMasks_FileSizesWithinCb');
                LoadRegistryItemToControlByName('jqxMasks_FileDatesWithinCb');
                LoadRegistryItemToControlByName('jqxInptMasks_FileSizesMin');
                LoadRegistryItemToControlByName('jqxInptDateMasks_FileMinDate');
                LoadRegistryItemToControlByName('jqxInptMasks_FileSizesMax');
                LoadRegistryItemToControlByName('jqxInptDateMasks_FileMaxDate');
                LoadRegistryItemToControlByName('jqxMasks_FileAgeCb');
                LoadRegistryItemToControlByName('jqxMasks_FileAgeCombo');
                LoadRegistryItemToControlByName('inptMasks_FileAgeDays');
                LoadRegistryItemToControlByName('inptMasks_FileAgeHours');
                LoadRegistryItemToControlByName('inptMasks_FileAgeMinutes');
                LoadRegistryItemToControlByName('jqxMasks_TargetDataRestoreCb');
                LoadRegistryItemToControlByName('jqxInptDateMasks_TargetDateRestoreDate');
                LoadRegistryItemToControlByName('jqxInptDateMasks_TargetDateRestoreTime');
                LoadRegistryItemToControlByName('cbScanOnlyFoldersModifiedSinceLastRun');
                $("#Masks_LastModification_Radio_Mode").jqxRadioButton({groupName :"Masks_FilterByWidget"});
                $("#Masks_Creation_Radio_Mode").jqxRadioButton({groupName :"Masks_FilterByWidget"});

                if (GisSyncoveryLinux)
                   $("#Masks_Creation_Radio_Mode").html("File or Metadata Change Time");

                LoadRegistryItemToControlByName('Masks_FilterByWidget');
                $("#Masks_ApplyToFiles_Radio_Mode").jqxRadioButton({groupName :"Masks_ApplyToWidget"});
                $("#Masks_ApplyToFolders_Radio_Mode").jqxRadioButton({groupName :"Masks_ApplyToWidget"});
                $("#Masks_ApplyToBoth_Radio_Mode").jqxRadioButton({groupName :"Masks_ApplyToWidget"});
                LoadRegistryItemToControlByName('Masks_ApplyToWidget');
                LoadRegistryItemToControlByName('cbScanOnlyFoldersModifiedSinceLastRun');
                bTabsMasksAndFiltersFileAge = true;
              }

              EnableDisableMasksAndFilters();
              $('#jqxTabsMasksAndFilters').jqxTabs('focus');
           });
          EnableDisableMasksAndFilters();
          break;
       case 7:
         $('#jqxTabsSafety').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
         if (!bTabsSafety)
         {
           LoadRegistryItemToControlByName('jqxSafety_WarnIfMovingFiles');
           LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingReadOnly');
           LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingLarger');
           LoadRegistryItemToControlByName('jqxSafety_WarnBeforeOverridingNewer');
           LoadRegistryItemToControlByName('jqxSafety_WarnBeforeDeleting');

           if (GisSyncoveryWindows)
              $('#AttendedModeWarningsComment').css({"display":"none"});

           bTabsSafety = true;
         }

          $('#jqxTabsSafety').on('selecting', function (event)
           {
                           
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
               //Attended Mode
              }
              else if ((ItemIndex == 1) && (bTabsSafetySafety == false))
              {
               //Special Safety
                LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingFilesMoreThan');
                LoadRegistryItemToControlByName('inptSafetySpecial_WarnIfDeletingFilesMoreThan');
                LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingAllFilesInAnySubfolder');
                LoadRegistryItemToControlByName('jqxSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder');
                LoadRegistryItemToControlByName('inptSafetySpecial_WarnIfDeletingMoreThanInAnySubfolder');
                bTabsSafetySafety = true;
                EnableDisableSafety();
              }
              else if ((ItemIndex == 2) && (bTabsSafetyUnattended == false))
              {
                 //Unattended Mode
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_OverwriteReadOnly');
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_OverwriteLarge');
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_NewerFilesCanBeOverwritten');
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_FileDeletionAllowedCb');
                 LoadRegistryItemToControlByName('inptSafetyUnattended_FileDeletionAllowed');
                 LoadRegistryItemToControlByName('inptSafetyUnattended_DeleteMaxFiles');
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_ReplaceMaxPercentCb');
                 LoadRegistryItemToControlByName('inptSafetyUnattended_ReplaceMaxPercent');
                 LoadRegistryItemToControlByName('jqxSafetyUnattended_EnableSpecialSafetyCheck');
                 EnableDisableSafetyUnattended();
                 bTabsSafetyUnattended = true;
              }
                          
          });
                      
         break;
       case 8:
         $('#jqxTabsSpecial').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});

         if (Gb_TabSpecial == false)
         {
            if (GisSyncoveryWindows)
               LoadRegistryItemToControlByName("jqxSpecialSpFeatr_ProcessSecurityCb");
            else
            {
               $('#jqxSpecialSpFeatr_ProcessSecurityCb').html('<button id="SecurityMoreBtn">&nbsp; File and Folder Security (Permissions)... &nbsp;</button>');
               $("#SecurityMoreBtn").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidthMini});
               $("#SecurityMoreBtn").click(function ()
                 {
                    DoShow_Special_SecurityAndSharesDlg();
                 });

            }

            var HTML_Special_AlternateDataStreamsDlg = "";

            if (!GisSyncoveryWindows)
               $("#btnSpecial_AlternateDataStreams").html("&nbsp; Extended Attributes... &nbsp;");

            $("#btnSpecial_AlternateDataStreams").jqxButton({ theme: 'energyblue' });

            $('#btnSpecial_AlternateDataStreams').click(function () {
                if (HTML_Special_AlternateDataStreamsDlg == "" )
                {
                  var client = new XMLHttpRequest();
                  if (GisSyncoveryWindows)
                     client.open('GET', '/Special_AlternateDataStreamsDlg.html');
                  else
                     client.open('GET', '/ExtAttrDlg.html');
                  client.onreadystatechange = function()
                  {
                     if (client.readyState == XMLHttpRequest.DONE)
                     {
                       HTML_Special_AlternateDataStreamsDlg = client.responseText;
                       if (HTML_Special_AlternateDataStreamsDlg != "")
                       {
                         $("#HTML_Special_AlternateDataStreamsDlg_div").html( HTML_Special_AlternateDataStreamsDlg );
                         setTimeout(ShowSpecial_AlternateDataStreamsDlg, 100);
                       }
                     }
                  }
                  client.send();
                }
                else
                  ShowSpecial_AlternateDataStreamsDlg();
              });

            GetHTMLintoVar('Special_CacheDestinationFileListDlg.html', 'HTML_CacheDestinationFileListDlg');
            $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxCheckBox({ width: 250, height: 25, checked : GSpecial_CacheDestinationFileList });
            $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").on('click', Show_Special_CacheDestinationFileListDlg );

            LoadRegistryItemToControlByName('jqxCopyingOrder');
            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_LeftSideUsesRemoteServiceCb');
            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_UsePartialFileUpdatingCb');

            LoadRegistryItemToControlByName('cbUseRemServToCopyFiles');

            $("#rbBlockLevelChecksums").jqxRadioButton({groupName :"BlockLevelRadiogroupWidget"});
            $("#rbBlockLevelFileSystemMonitoring").jqxRadioButton({groupName :"BlockLevelRadiogroupWidget"});
            LoadRegistryItemToControlByName('BlockLevelRadiogroupWidget');

            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_RightSideUsesRemoteServiceCb');
            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_RightSideRemoteServiceCb');
            LoadRegistryItemToControlByName('jqxSpecial_DontFallBackFromPartialCb');
            LoadRegistryItemToControlByName('jqxSpecial_PartialRemoteOneByOneCb');
            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_FastModeCb');
            LoadRegistryItemToControlByName('jqxSpecialSpFeatr_UseDifferentFoldersCb');

            $("#btnCommunicationPaths").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GChooseFolderFilesBtnWidth });
            $("#btnCommunicationPaths").click(function ()
              {
                if (HTML_Special_PathsForCommunicationDlg == "" )
                {
                   var client = new XMLHttpRequest();
                   client.open('GET', '/PathsForCommunicationDlg.html');
                   client.onreadystatechange = function()
                   {
                     if (client.readyState == XMLHttpRequest.DONE)
                     {
                       HTML_Special_PathsForCommunicationDlg = client.responseText;
                       if (HTML_Special_PathsForCommunicationDlg != "")
                       {
                          $("#HTML_Special_PathsForCommunicationDlg_div").html( HTML_Special_PathsForCommunicationDlg );
                          setTimeout(Special_PathsForCommunicationDlg, 100);
                       }
                     }
                   }
                   client.send();
                }
                else
                  Special_PathsForCommunicationDlg();
             });


            LoadRegistryItemToControlByName('cbRedownloadServerModifiedUploads');
            if (GisSyncoveryWindows)
            {
               LoadRegistryItemToControlByName('inptSpecialSpFeatr_SetTargetVolumeLabel');
               LoadRegistryItemToControlByName('cbDetectChangedFilesViaMonitoring');
            }
            else
            {
                $('#inptSpecialSpFeatr_SetTargetVolumeLabel').css({"display":"none"});
                $('#cbDetectChangedFilesViaMonitoring').css({"display":"none"});
            }
            LoadRegistryItemToControlByName('cbDoubleCheckTimestamps');
            LoadRegistryItemToControlByName('cbSpawnSeparateSubJobs');
            LoadRegistryItemToControlByName('inptSpawnSeparateSubJobs');

            Gb_TabSpecial = true;
          }

           $('#jqxTabsSpecial').on('selecting', function (event)
           {
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
                // Special Features - nothing to do, controls already shown (see case 8 above)
              }
              else
              if ((ItemIndex == 2) && (bTabsSpecialDatabase == false))
              {
                 // Database
                 LoadRegistryItemToControlByName('jqxSpDb_OpenDatabaseReadOnlyCb');
                 LoadRegistryItemToControlByName('jqxSpecialDatabase_FastModeCb');
                 LoadRegistryItemToControlByName('inptSpecialDatabase_DatabaseNameToUse');
                 LoadRegistryItemToControlByName('inptSpecialDatabase_Left');
                 LoadRegistryItemToControlByName('inptSpecialDatabase_Right');
                 $("#btnDeleteDB").jqxButton({ height: GBtnHeight, width: GBtnWidthMini,theme: 'energyblue'});
                 $('#btnDeleteDB').click(function ()
                  {
                     var sendparams = { };
                     sendparams.token = GClientToken;
                     sendparams.ProfileName = GSelectedProfileName;
                     $.post( "deleteprofiledb.php",JSON.stringify(sendparams));
                  });
                 bTabsSpecialDatabase = true;

              }
              EnableDisableSpecial();
            });
         EnableDisableSpecial();
         break;
       case 9:
         $('#jqxTabsVersioning').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
         if (bTabsVersioning == false)
         {
           LoadRegistryItemToControlByName('jqxVersVers_KeepOlderVersionsWhenReplacing');
           LoadRegistryItemToControlByName('inptVersVers_PerFile');
           $("#VersVers_Add_Prefix_Mode").jqxRadioButton({groupName :"VersVers_RenamingOlderVersionsWidget"});
           $("#VersVers_Add_Timestamp_Mode").jqxRadioButton({groupName :"VersVers_RenamingOlderVersionsWidget"});
           LoadRegistryItemToControlByName('VersVers_RenamingOlderVersionsWidget');
           LoadRegistryItemToControlByName('jqxVersVers_OnlyOnRightHandSide');
           LoadRegistryItemToControlByName('jqxVersVers_MoveIntoFolder');
           LoadRegistryItemToControlByName('inptMoveIntoFolder');
           LoadRegistryItemToControlByName('jqxVersVers_AsSubfolerInEachFolderCb');
           LoadRegistryItemToControlByName('jqxVersVers_RecreateTreeBelowCb');
           LoadRegistryItemToControlByName('jqxVersVers_DontRenameNewestOlderVersionCb');
           LoadRegistryItemToControlByName('jqxVersVers_KeepOneVersionOfDeletedFilesCb');
           LoadRegistryItemToControlByName('jqxVersVers_FileNameEncodingCb');
           bTabsVersioning = true;
          };
           $('#jqxTabsVersioning').on('selecting', function (event)
           {
              var ItemIndex = event.args.item;
              if (ItemIndex == 0)
              {
                //Versioning
              }
              else if ((ItemIndex == 1) && (bTabsVersioningSynthetic == false))
              {
                 // Synthetic backup
                 LoadRegistryItemToControlByName('jqxVersSynth_UseSynthBackupsCb');
                 LoadRegistryItemToControlByName('jqxVersSynth_UseCheckPointsCb');
                 LoadRegistryItemToControlByName('jqxVersSynth_CreateCheckpointCombo');
                 LoadRegistryItemToControlByName('jqxVersSynth_CheckpointsRelativeCombo');
                 LoadRegistryItemToControlByName('jqxVersSynth_BuildAllIncrementalCb');
                 LoadRegistryItemToControlByName('jqxVersSynth_RemoveUnneededCb');
                 LoadRegistryItemToControlByName('inptVersSynth_RemoveUnneeded');
                 LoadRegistryItemToControlByName('jqxVersSynth_RemoveUnneededCombo');
                 LoadRegistryItemToControlByName('jqxVersSynth_IfAllBlocksCb');
                 EnableDisableVersionsSynthBackup();
                 bTabsVersioningSynthetic = true;
              }
              else if ((ItemIndex == 2) && (bTabsVersioningMore == false))
              {
               //More
                 LoadRegistryItemToControlByName('jqxVersMore_DoNotDecodeLeftHandCb');
                 LoadRegistryItemToControlByName('jqxVersMore_DoNotDecodeRightHandCb');
                 LoadRegistryItemToControlByName('cbEncodeWithWindows10Mangling');
                 LoadRegistryItemToControlByName('cbDecodeAllManglingFormats');
                 LoadRegistryItemToControlByName('jqxVersMore_CleanUpIdenticalCb');
                 LoadRegistryItemToControlByName('jqxVersMore_CleanUpDuplicatesOnSourceSideCb');
                 LoadRegistryItemToControlByName('jqxVersMore_RemoveParenthesizedCb');
                 LoadRegistryItemToControlByName('jqxVersMore_RemoveVesioningTagsCb');
                 LoadRegistryItemToControlByName('jqxVersMore_CleanUpAllOlderVersionsCb');
                 LoadRegistryItemToControlByName('jqxVersMore_FilesBackupV4Cb');
                 bTabsVersioningMore = true;
              }

           });
         break;
       case 10:
         $('#jqxTabsZip').jqxTabs({ width: GProfileSettingsTabControlWidth - 10, height: GProfileSettingsTabControlHeight, keyboardNavigation: false});
         if (bTabsZip == false)
         {
           LoadRegistryItemToControlByName('jqxZipping_ZipEachFileCb');
           LoadRegistryItemToControlByName('jqxZipFormatCombo');
           if (!GAllowSZ)
           {
              $("#jqxZipFormatCombo").jqxDropDownList({selectedIndex:0});
              $("#jqxZipFormatCombo").jqxDropDownList('disabled',true);
           }
           LoadRegistryItemToControlByName('jqxZipLevelCombo');
           LoadRegistryItemToControlByName('jqxZipping_UseZipPackagesCb');
           LoadRegistryItemToControlByName('jqxZipping_ZipDirectlyToDestinationCb');
           LoadRegistryItemToControlByName('jqxZipping_UnzipAllfilesCb');
           LoadRegistryItemToControlByName('jqxZipping_LimitZipFileSizeCb');
           LoadRegistryItemToControlByName('inptZipping_Limit');
           EnableDisableZipTab();
           ZipFormatChange();
           bTabsZip = true;
          };
         $('#jqxTabsZip').on('selecting', function (event)
         {
           var ItemIndex = event.args.item;
           if (ItemIndex == 0)
           {
                             
           }
           else if ((ItemIndex == 1) && (bTabsZipEncrypt == false))
           {
              LoadRegistryItemToControlByName('jqxZippingEncrypt_EncryptFilesCb');
              LoadRegistryItemToControlByName('jqxZippingEncrypt_Combo');
              LoadRegistryItemToControlByName('jqxZippingEncrypt_DecryptFilesCb');
              LoadRegistryItemToControlByName('jqxZippingEncrypt_Password');

              $("#jqxZippingEncrypt_Confirm").jqxPasswordInput(
                  { width: 400, height: 25 });
              $("#jqxZippingEncrypt_Confirm").jqxPasswordInput(
                    'val', $("#jqxZippingEncrypt_Password").jqxPasswordInput('val'));

              LoadRegistryItemToControlByName('jqxZippingEncrypt_FilenameEncryptionCb');
              LoadRegistryItemToControlByName('jqxZippingEncrypt_EncryptExistingNamesCb');
              LoadRegistryItemToControlByName('jqxZippingEncrypt_FoldernameEncryptionCb');
              EnableDisableEncryptionTab();
              bTabsZipEncrypt = true;
           }

         });
         break;
       }
     }
 });

  $('#jqxTabs').on('selecting', function (event)
  { // Some code here.
     var ItemIndex = event.args.item;
     if ((ItemIndex == 4) && (bFoldersTabCreated == false))
     {
         //Folders
         LoadRegistryItemToControlByName('jqxFolders_CreateEmptyFolders');
         LoadRegistryItemToControlByName('jqxFolders_UseIntermediateLocationCb');
         LoadRegistryItemToControlByName('jqxFolders_RemoveEmptiedFolders');
         LoadRegistryItemToControlByName('jqxFolders_OnRightSideCreateFolderEachTime');
         LoadRegistryItemToControlByName('jqxFolders_IncludeTimeOfDay');

         LoadRegistryItemToControlByName('jqxFolders_FlatRightSide');
         LoadRegistryItemToControlByName('jqxFolders_CopyLatestFileIfExists');
         LoadRegistryItemToControlByName('jqxFolders_FlatRightAddTimestampsForDupes');
         LoadRegistryItemToControlByName('jqxFolders_EnsureFolderTimestamps');
         LoadRegistryItemToControlByName('jqxDontDeleteFolders');
         LoadRegistryItemToControlByName('cbTouchLeftParents');
         LoadRegistryItemToControlByName('cbTouchRightParents');
         LoadRegistryItemToControlByName('jqxFolders_ScanAllDestinationFoldersToFindMovedFiles');
         LoadRegistryItemToControlByName('jqxFolders_CreateFolderSymlinksOnly');

         EnableDisableFolders();
         bFoldersTabCreated = true;

     }
     if ((ItemIndex == 5) && (bJobTabCreated == false) )
     {
        //Job
        LoadRegistryItemToControlByName('jqxJob_ExecuteCommand');
        LoadRegistryItemToControlByName('jqxJob_ShowCheckboxesInPreview');
        LoadRegistryItemToControlByName('jqxJob_OverrideEmailSettings');
        LoadRegistryItemToControlByName('jqxJob_CheckFreeSpaceBeforeCopying');
        LoadRegistryItemToControlByName('jqxJob_RunAsUser');
        LoadRegistryItemToControlByName('jqxJob_IgnoreInternetConnectivityCheck');
        LoadRegistryItemToControlByName('jqxJob_NetworkConnections');
        LoadRegistryItemToControlByName('jqxJob_UseExternalCopyingTool');
        LoadRegistryItemToControlByName('jqxJob_RunOnlyIfNeitherSideEmpty');
        LoadRegistryItemToControlByName('jqxJob_WhenRunViaScheduler');
        LoadRegistryItemToControlByName('jqxJob_WhenRunManuallyUnattended');
        LoadRegistryItemToControlByName('jqxJob_WhenRunManuallyAttended');

        $("#Job_Threads_Default_Radio_Mode").jqxRadioButton({groupName :"JobFilesThreadsRadiogroupWidget"});
        $("#Job_Threads_Custom_Radio_Mode").jqxRadioButton({groupName :"JobFilesThreadsRadiogroupWidget"});

        LoadRegistryItemToControlByName('JobFilesThreadsRadiogroupWidget');
        LoadRegistryItemToControlByName('inptScanningThreads');

        $("#jqxPascalScriptCb").jqxCheckBox({ width: 250, height: 25, checked : GUsePascalScript });
        $("#jqxPascalScriptCb").on('click', ShowPascalScriptDlg );
        bJobTabCreated = true;
                     
     }
  });


 //Profile settings Dialog
   $('#jqxProfileEditorForm').jqxWindow({ maxWidth: GProfileSettingsDialogWidth,  width: GProfileSettingsDialogWidth,
     maxHeight: GProfileSettingsDialogHeight, height: GProfileSettingsDialogHeight, autoOpen: false, isModal: true,
     theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });

  if (GIsTabletApplication)
  {
    //disable horizontal scroll
     var $body = $(document);
     $body.bind('scroll', function() {
         // "Disable" the horizontal scroll.
         if ($body.scrollLeft() != 0)
         {
             $body.scrollLeft(0);
         }
     });
  }

   LoadRegistryListToVariables(GProfileEditorRegistryList);

   LoadRegistryItemToControlByName('inptProfileName');

   var lwidth = GisSyncoveryWindows ? 300 : 270;
   var rwidth = GisSyncoveryWindows ? 400 : 370;

   $("#inptLeftHandSide").jqxInput({ width : lwidth, height : 25 }); //, theme: 'shinyblack'
   $("#inptLeftHandSide").jqxInput( 'val', GLeftStoredPath )
   $("#inptRightHandSide").jqxInput({ width : rwidth, height : 25 }); //, theme: 'shinyblack'
   $("#inptRightHandSide").jqxInput( 'val', GRightStoredPath );

   LoadRegistryItemToControlByName('cbAdditionalDests');
   GAdditionalDests=GetCheckBoxValue('cbAdditionalDests');

   LoadRegistryItemToControlByName('jqxLeftToRightCb');
   LoadRegistryItemToControlByName('jqxRightToLeftCb');
                
   $("#NoneMode").jqxRadioButton({groupName :"IncludeSubfoldersWidget"});
   $("#AllMode").jqxRadioButton({groupName :"IncludeSubfoldersWidget"});
   $("#SelectedMode").jqxRadioButton({groupName :"IncludeSubfoldersWidget"});
  /*
   LoadRegistryItemToControl(GRadioButtonsRegistryList[0]); //NoneMode
   LoadRegistryItemToControl(GRadioButtonsRegistryList[1]); //AllMode
   LoadRegistryItemToControl(GRadioButtonsRegistryList[2]); //SelectedMode
   */
   LoadRegistryItemToControlByName('IncludeSubfoldersWidget');


   $("#Standard_Copying_Mode").jqxRadioButton({groupName :"SyncOperationModeWidget"});

   $("#Standard_Copying_Mode").on('change', function (event) {
               
     if (event.args.checked)
     {
       do_sync_operationmode_description("Standard_Copying_Mode");
       GMrr_ExactMirrorDeletesCb = false;
       GMrr_ExactMirrorOverwritesNewerFilesCb = false;
       GMrr_DeleteNonMatchingFiltersCb = false;
       GMrr_DeleteDeselectedCb = false;
       GMrr_DeleteNonMatchingMasksCb = false;
       syncOperationModeEnableDisable();
     }
    } );

   $("#SmartTracking_Mode").jqxRadioButton({groupName :"SyncOperationModeWidget"});

   $("#SmartTracking_Mode").on('change', function (event) {
     if (event.args.checked)
     {
       do_sync_operationmode_description("SmartTracking_Mode");
       GMrr_ExactMirrorDeletesCb = false;
       GMrr_ExactMirrorOverwritesNewerFilesCb = false;
       GMrr_DeleteNonMatchingFiltersCb = false;
       GMrr_DeleteDeselectedCb = false;
       GMrr_DeleteNonMatchingMasksCb = false;
       syncOperationModeEnableDisable();
     }
   });

   $("#Exact_Mirror_Mode").jqxRadioButton({groupName :"SyncOperationModeWidget"});
   $("#Exact_Mirror_Mode").on('change', function (event) {
     if (event.args.checked)
 {
       do_sync_operationmode_description("Exact_Mirror_Mode");
       if (!GMrr_ExactMirrorDeletesCb && !GMrr_ExactMirrorOverwritesNewerFilesCb &&
           !GMrr_DeleteNonMatchingFiltersCb && !GMrr_DeleteDeselectedCb && !GMrr_DeleteNonMatchingMasksCb)
       {
          // default values!!
          GMrr_ExactMirrorDeletesCb = true;
          GMrr_ExactMirrorOverwritesNewerFilesCb = true;
          GMrr_DelayDeletionsCb = false;
          GMrr_OVDelayDeletionsCb = false;
       }
       syncOperationModeEnableDisable();
  }
    });

   $("#Move_Files_Mode").jqxRadioButton({groupName :"SyncOperationModeWidget"});
              
   $("#Move_Files_Mode").on('change', function (event) {
     if (event.args.checked)
     {
       do_sync_operationmode_description("Move_Files_Mode");
       GMrr_ExactMirrorDeletesCb = false;
       GMrr_ExactMirrorOverwritesNewerFilesCb = false;
       GMrr_DeleteNonMatchingFiltersCb = false;
       GMrr_DeleteDeselectedCb = false;
       GMrr_DeleteNonMatchingMasksCb = false;
       syncOperationModeEnableDisable();
     }
   });

   LoadRegistryItemToControlByName('CaseSensitive');

 /*
   LoadRegistryItemToControl(GRadioButtonsRegistryList[3]); //Standard_Copying_Mode
   LoadRegistryItemToControl(GRadioButtonsRegistryList[4]); //SmartTracking_Mode
   LoadRegistryItemToControl(GRadioButtonsRegistryList[5]); //Exact_Mirror_Mode
   LoadRegistryItemToControl(GRadioButtonsRegistryList[6]); //Move_Files_Mode
 */
   LoadRegistryItemToControlByName('SyncOperationModeWidget');

   syncOperationModeEnableDisable();



function AssignLeftPath()
{
  var LNewPath = $("#inptLeftHandSide").jqxInput( 'val' );

  GLeftStoredPath = LNewPath;

  GLeftStoredPath = $("#inptLeftHandSide").jqxInput( 'val' );
}

function AssignRightPath()
{
  var LNewPath = $("#inptRightHandSide").jqxInput( 'val' );

  GRightStoredPath =  LNewPath;

  GRightStoredPath =  $("#inptRightHandSide").jqxInput( 'val' );
}

     $("#infoButton1").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidthMini-4});
     $('#infoButton1').click(function ()
     {
       var Lleftpath=$("#inptLeftHandSide").jqxInput('val');

       if ((Lleftpath!='') && (Lleftpath.indexOf("://")>=0))
       {
          PostProfileEditor("***BROWSEDUMMY***", "Browse",
              function()
              {
                 InitDirTreeSelectForm($("#inptLeftHandSide"), AssignLeftPath, "left");
              });
       }
       else
       {
          InitDirTreeSelectForm($("#inptLeftHandSide"), AssignLeftPath, "left");
       }
     });

     $("#infoButton2").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidthMini-4});
     $('#infoButton2').click(function ()
     {
    var Lrightpath=$("#inptRightHandSide").jqxInput('val');
        if ((Lrightpath!='') && (Lrightpath.indexOf("://")>=0))
        {
           PostProfileEditor("***BROWSEDUMMY***", "Browse",
              function()
              {
                 InitDirTreeSelectForm($("#inptRightHandSide"), AssignRightPath, "right");
              });
        }
        else
           InitDirTreeSelectForm($("#inptRightHandSide"), AssignRightPath, "right");
     });

     if (GisSyncoveryWindows)
        $('#smbBtnLeft').css({"display":"none"});
     else
     {
       $("#smbBtnLeft").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth/2-4});
       $('#smbBtnLeft').click(function ()
       {
          GLeftProtocolName = "SMB";
          DoSMBDialog(GSelectedProfileName,false,$("#inptLeftHandSide"),GLeftStoredPath);
       });
     }
	    
     $("#intrntBtnLeft").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth*4/3-4});
     $('#intrntBtnLeft').click(function ()
     {
         if (GLeftProtocolName == "")
         {
             GLeftProtocolName = "FTP";
             //document.getElementById("error_message").innerHTML = "GLeftProtocolName is empty";
             //return;
         }
         DoInternetSettingsDialog( GSelectedProfileName,
                                   GInternetProtocolSetLEFTRegistryList,
                                   "left",
                                   GLeftProtocolName,
                                   $("#inptLeftHandSide"),
                                   GLeftStoredPath,
                                   GLeftUsername,
                                   GLeftPassword,
                                   false);
     });

     if (GisSyncoveryWindows)
        $('#smbBtnRight').css({"display":"none"});
     else
     {
       $("#smbBtnRight").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth/2-4});
       $('#smbBtnRight').click(function ()
       {
          GLeftProtocolName = "SMB";
          DoSMBDialog(GSelectedProfileName,true,$("#inptRightHandSide"),GRightStoredPath);
       });
     }

     $("#intrntBtnRight").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth*4/3-4});
     $('#intrntBtnRight').click(function ()
     {
         if (GRightProtocolName == "")
         {
             GRightProtocolName = "FTP";
         }

         DoInternetSettingsDialog( GSelectedProfileName, GInternetProtocolSetRIGHTRegistryList, "right",
                                   GRightProtocolName, $("#inptRightHandSide"),
                                   GRightStoredPath,
                                   GRightUsername,
                                   GRightPassword,
                                   false);
     });

     $("#btnChooseFolderFiles").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GChooseFolderFilesBtnWidth });
     $('#btnChooseFolderFiles').click(function ()
     {
           PostProfileEditor("***BROWSEDUMMY***", "Browse",
              function()
              {
                 DoChooseFolderFilesDlg(GSelectedProfileName);
              });
     });

     function ShowSmartTrackingSettingsDlg()
     {
         $('#jqxSmartTrackingSettingsDlg').jqxWindow({ maxWidth: 710,  width:710, maxHeight:550, height:550, autoOpen: false, isModal: true,
         theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });

         $('#jqxSmartTracking_SettingsTabs').jqxTabs({ width: 690, height: 370});

         $("#Smt_Moved_Off_Mode").jqxRadioButton({groupName :"TabMoved"});
         $("#Smt_Moved_Fully_Automatic_Mode").jqxRadioButton({groupName :"TabMoved"});
         $("#Smt_Moved_Adjust_On_Left_Mode").jqxRadioButton({groupName :"TabMoved"});
         $("#Smt_Moved_Adjust_On_Right_Mode").jqxRadioButton({groupName :"TabMoved"});

         SetSmartTrackingGlobalVariablesFromFilesTab();

         SetRadioGroupChecked( GSmartTrackingMoveSettingsWidget,   $("#Smt_Moved_Off_Mode"),  $("#Smt_Moved_Fully_Automatic_Mode"), $("#Smt_Moved_Adjust_On_Left_Mode"), $("#Smt_Moved_Adjust_On_Right_Mode"), null, null );
                
         $("#Smt_Deleted_Copy_Back_Mode").jqxRadioButton({groupName :"TabDeleted"});
         $("#Smt_Deleted_Ignore_Mode").jqxRadioButton({groupName :"TabDeleted"});
         $("#Smt_Deleted_Move_IntoFolder_Mode").jqxRadioButton({groupName :"TabDeleted"});
         $("#Smt_Deleted_DeletePermamently_Mode").jqxRadioButton({groupName :"TabDeleted"});

         if (GbTabFilesDeletions) // if tab created
         {
            if ($("#jqxFilesDeletions_MoveFilesToSFolder").jqxCheckBox('checked'))
               GSmartTrackingDeletedSettingsWidget = "Smt_Deleted_Move_IntoFolder_Mode";
            else
               if (GSmartTrackingDeletedSettingsWidget=="Smt_Deleted_Move_IntoFolder_Mode")
                  GSmartTrackingDeletedSettingsWidget="";
         }

         if (GSmartTrackingDeletedSettingsWidget=="")
            GSmartTrackingDeletedSettingsWidget = "Smt_Deleted_Ignore_Mode";
         //alert("Setting deleted radio to "+GSmartTrackingDeletedSettingsWidget);
         SetRadioGroupChecked( GSmartTrackingDeletedSettingsWidget,   $("#Smt_Deleted_Copy_Back_Mode"),  $("#Smt_Deleted_Ignore_Mode"), $("#Smt_Deleted_Move_IntoFolder_Mode"), $("#Smt_Deleted_DeletePermamently_Mode"), null, null );
                
         $("#Smt_Confl_Copy_Latest_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#Smt_Confl_DoNothing_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#Smt_Confl_AlwaysCopyLeftToRight_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#Smt_Confl_AlwaysCopyRightToLeft_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#Smt_Confl_Rename_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#Smt_Confl_Prompt_Mode").jqxRadioButton({groupName :"Panel1"});

         if (GSmartTrackingConflictingSettingsWidget=="")
            GSmartTrackingConflictingSettingsWidget = "Smt_Confl_DoNothing_Mode";
         //alert("Setting Conflict radio to "+GSmartTrackingConflictingSettingsWidget);
         SetRadioGroupChecked( GSmartTrackingConflictingSettingsWidget,   $("#Smt_Confl_Copy_Latest_Mode"),  $("#Smt_Confl_DoNothing_Mode"), $("#Smt_Confl_AlwaysCopyLeftToRight_Mode"), $("#Smt_Confl_AlwaysCopyRightToLeft_Mode"), $("#Smt_Confl_Rename_Mode"), $("#Smt_Confl_Prompt_Mode") );

         $("#Smt_Confl_UseNumbers_Mode").jqxRadioButton({groupName :"Panel2" });
         $("#Smt_Confl_Replace_Mode").jqxRadioButton({groupName :"Panel2" });
         if (GSmartTrackingConflictsIfExistsAddNumberWidget=="")
            GSmartTrackingConflictsIfExistsAddNumberWidget="Smt_Confl_UseNumbers_Mode";
         SetRadioGroupChecked( GSmartTrackingConflictsIfExistsAddNumberWidget,   $("#Smt_Confl_UseNumbers_Mode"),  $("#Smt_Confl_Replace_Mode"), null, null, null, null );

         $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput({ width : 530, height : 25 }); //, theme: 'shinyblack'
         $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput('val', GMoveDeletedFilesIntoFolderL);

         $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput({ width : 530, height : 25 }); //, theme: 'shinyblack'
         $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput('val', GMoveDeletedFilesIntoFolderR);

         $("#jqxSmt_DetectUnchangedLeftCb").jqxCheckBox({ width: 450, height: 25, checked : GSmt_DetectUnchangedLeftCb });//, theme: 'shinyblack'
         $("#jqxSmt_DetectUnchangedRightCb").jqxCheckBox({ width: 450, height: 25, checked : GSmt_DetectUnchangedRightCb });//, theme: 'shinyblack'
         $("#jqxSmt_DetectServerSizeModsCb").jqxCheckBox({ width: 550, height: 25, checked : GSmt_DetectServerSizeModsCb });//, theme: 'shinyblack'

         $("#jqxSmt_BothNewConflictCb").jqxCheckBox({ width: 650, height: 25, checked : GSmt_BothNewConflictCb });//, theme: 'shinyblack'
         $("#jqxSmt_BothNewConflictCheckArchiveFlagAndTimestampCb").jqxCheckBox({ width: 650, height: 25, checked : GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb });//, theme: 'shinyblack'

         if (!GSmt_ConflictsAddNumberCb && !GSmt_ConflictsAddUserCb &&
             !GSmt_ConflictsAddTimeCb && !GSmt_ConflictsAddDollarCb)
            GSmt_ConflictsAddNumberCb = true;

         $("#jqxSmt_ConflictsAddNumberCb").jqxCheckBox({ width: 160, height: 25, checked : GSmt_ConflictsAddNumberCb });//, theme: 'shinyblack'
         $("#jqxSmt_ConflictsAddUserCb").jqxCheckBox({ width: 110, height: 25, checked : GSmt_ConflictsAddUserCb });//, theme: 'shinyblack'
         $("#jqxSmt_ConflictsAddTimeCb").jqxCheckBox({ width: 150, height: 25, checked : GSmt_ConflictsAddTimeCb });//, theme: 'shinyblack'
         $("#jqxSmt_ConflictsAddDollarCb").jqxCheckBox({ width: 60, height: 25, checked : GSmt_ConflictsAddDollarCb });//, theme: 'shinyblack'


         $("#btn_Smt_DirSelectL").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth });
         $('#btn_Smt_DirSelectL').click(function () {
           InitDirTreeSelectForm($("#inpt_Smt_DeletedFilesIntoFolderL"), null, "left");
         });

         $("#btn_Smt_DirSelectR").jqxButton({ theme: 'energyblue', height: GBtnHeight, width: GBtnWidth });
         $('#btn_Smt_DirSelectR').click(function () {
           InitDirTreeSelectForm($("#inpt_Smt_DeletedFilesIntoFolderR"), null, "right");
         });

         $('#SmtSet_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
         $('#SmtSet_OK_btn').click(function () {
                
            GSmartTrackingMoveSettingsWidget = GetCheckedRadiobuttonName(  $("#Smt_Moved_Off_Mode"),  $("#Smt_Moved_Fully_Automatic_Mode"), $("#Smt_Moved_Adjust_On_Left_Mode"), $("#Smt_Moved_Adjust_On_Right_Mode"), null, null );

            GSmartTrackingDeletedSettingsWidget = GetCheckedRadiobuttonName( $("#Smt_Deleted_Copy_Back_Mode"),  $("#Smt_Deleted_Ignore_Mode"), $("#Smt_Deleted_Move_IntoFolder_Mode"), $("#Smt_Deleted_DeletePermamently_Mode"), null, null );
            GSmartTrackingConflictingSettingsWidget = GetCheckedRadiobuttonName( $("#Smt_Confl_Copy_Latest_Mode"),  $("#Smt_Confl_DoNothing_Mode"), $("#Smt_Confl_AlwaysCopyLeftToRight_Mode"), $("#Smt_Confl_AlwaysCopyRightToLeft_Mode"), $("#Smt_Confl_Rename_Mode"), $("#Smt_Confl_Prompt_Mode") );
            GSmt_DetectUnchangedLeftCb = $("#jqxSmt_DetectUnchangedLeftCb").jqxCheckBox('val');
            GSmt_DetectUnchangedRightCb = $("#jqxSmt_DetectUnchangedRightCb").jqxCheckBox('val');
            GSmt_DetectServerSizeModsCb = $("#jqxSmt_DetectServerSizeModsCb").jqxCheckBox('val');
            GSmt_BothNewConflictCb = $("#jqxSmt_BothNewConflictCb").jqxCheckBox('val');
            GSmt_BothNewConflictCheckArchiveFlagAndTimestampCb = $("#jqxSmt_BothNewConflictCheckArchiveFlagAndTimestampCb").jqxCheckBox('val');
            GSmt_ConflictsAddNumberCb = $("#jqxSmt_ConflictsAddNumberCb").jqxCheckBox('val');

            GSmt_ConflictsAddUserCb = $("#jqxSmt_ConflictsAddUserCb").jqxCheckBox('val');
            GSmt_ConflictsAddTimeCb = $("#jqxSmt_ConflictsAddTimeCb").jqxCheckBox('val');
            GSmt_ConflictsAddDollarCb = $("#jqxSmt_ConflictsAddDollarCb").jqxCheckBox('val');
            GSmartTrackingConflictsIfExistsAddNumberWidget = GetCheckedRadiobuttonName( $("#Smt_Confl_UseNumbers_Mode"),  $("#Smt_Confl_Replace_Mode"), null, null, null, null );

            GMoveDeletedFilesIntoFolderL = $("#inpt_Smt_DeletedFilesIntoFolderL").jqxInput('val');
            GMoveDeletedFilesIntoFolderR = $("#inpt_Smt_DeletedFilesIntoFolderR").jqxInput('val');

            SetFilesTabFromSmartTrackingGlobalVariables();

            SetFilesDeletionsTabFromSmartTrackingGlobalVariables();

            $('#jqxSmartTrackingSettingsDlg').jqxWindow('close');
          });


         $('#SmtSet_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

         $('#SmtSet_Cancel_btn').click(function () {

            $('#jqxSmartTrackingSettingsDlg').jqxWindow('close');
         });



        $('#jqxSmartTrackingSettingsDlg').jqxWindow('open');
     }

     function ShowExactMirrorSettingsDlg()
     {
       $('#jqxExactMirrorSettingsDlg').jqxWindow({ maxWidth: 710,  width:600, maxHeight:550, height:550, autoOpen: false, isModal: true,
         theme: 'energyblue', animationType: 'slide' , draggable: !GIsTabletApplication});
       $("#jqxMrr_ExactMirrorDeletesCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_ExactMirrorDeletesCb });//, theme: 'shinyblack'
       $("#jqxMrr_ExactMirrorOverwritesNewerFilesCb").jqxCheckBox({ width: 400, height: 25, checked : GMrr_ExactMirrorOverwritesNewerFilesCb });//, theme: 'shinyblack'
              
       $("#jqxMrr_DelayDeletionsCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_DelayDeletionsCb});//, theme: 'shinyblack'
              
              
       $("#jqxMrr_DeleteNonMatchingFiltersCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_DeleteNonMatchingFiltersCb });//, theme: 'shinyblack'
       $("#jqxMrr_DeleteDeselectedCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_DeleteDeselectedCb });//, theme: 'shinyblack'
       $("#jqxMrr_DeleteNonMatchingMasksCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_DeleteNonMatchingMasksCb });//, theme: 'shinyblack'
  
  
       $("#inptMrr_DelayDelDays").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_DelayDelDays").jqxNumberInput( 'val', GMrr_DelayDelDays );

       $("#inptMrr_DelayDelHours").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_DelayDelHours").jqxNumberInput( 'val', GMrr_DelayDelHours );

       $("#inptMrr_DelayDelMinutes").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_DelayDelMinutes").jqxNumberInput( 'val', GMrr_DelayDelMinutes );

       $("#jqxMrr_OVDelayDeletionsCb").jqxCheckBox({ width: 500, height: 25, checked : GMrr_OVDelayDeletionsCb });//, theme:'shinyblack'
  
       $("#inptMrr_OVDelayDelDays").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_OVDelayDelDays").jqxNumberInput( 'val', GMrr_OVDelayDelDays );

       $("#inptMrr_OVDelayDelHours").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_OVDelayDelHours").jqxNumberInput( 'val', GMrr_OVDelayDelHours );

       $("#inptMrr_OVDelayDelMinutes").jqxNumberInput( { width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 } );//, theme:'shinyblack'
       $("#inptMrr_OVDelayDelMinutes").jqxNumberInput( 'val', GMrr_OVDelayDelMinutes );


  

         $('#ExactMirror_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

         $('#ExactMirror_OK_btn').click(function () {
            GMrr_ExactMirrorOverwritesNewerFilesCb = $("#jqxMrr_ExactMirrorOverwritesNewerFilesCb").jqxCheckBox('val');
            GMrr_ExactMirrorDeletesCb = $("#jqxMrr_ExactMirrorDeletesCb").jqxCheckBox('val');
            GMrr_DelayDeletionsCb = $("#jqxMrr_DelayDeletionsCb").jqxCheckBox('val');
            GMrr_DeleteNonMatchingFiltersCb = $("#jqxMrr_DeleteNonMatchingFiltersCb").jqxCheckBox('val');
            GMrr_DeleteDeselectedCb = $("#jqxMrr_DeleteDeselectedCb").jqxCheckBox('val');
            GMrr_DeleteNonMatchingMasksCb = $("#jqxMrr_DeleteNonMatchingMasksCb").jqxCheckBox('val');
            GMrr_DelayDelDays = $("#inptMrr_DelayDelDays").jqxNumberInput( 'val' );
            GMrr_DelayDelHours = $("#inptMrr_DelayDelHours").jqxNumberInput( 'val' );
            GMrr_DelayDelMinutes = $("#inptMrr_DelayDelMinutes").jqxNumberInput( 'val' );
            GMrr_OVDelayDelDays = $("#inptMrr_OVDelayDelDays").jqxNumberInput( 'val' );
            GMrr_OVDelayDelHours = $("#inptMrr_OVDelayDelHours").jqxNumberInput( 'val' );
            GMrr_OVDelayDelMinutes = $("#inptMrr_OVDelayDelMinutes").jqxNumberInput( 'val' );
            GMrr_OVDelayDeletionsCb = $("#jqxMrr_OVDelayDeletionsCb").jqxCheckBox( 'val' );
            $('#jqxExactMirrorSettingsDlg').jqxWindow('close');
         });


         $('#ExactMirror_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

         $('#ExactMirror_Cancel_btn').click(function () {

            $('#jqxExactMirrorSettingsDlg').jqxWindow('close');
         });

       $('#jqxExactMirrorSettingsDlg').jqxWindow('open');
     }

     function ShowMoveSettingsDlg()
     {
        $('#jqxMoveSettingsDlg').jqxWindow({ maxWidth: 500,  width:500, maxHeight:400, height:400, autoOpen: false, isModal: true,
         theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });

         $("#mmMoveNormal_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#mmOverwriteDest_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#mmRenameSource_Mode").jqxRadioButton({groupName :"Panel1"});
         $("#mmDeleteIdenticalSource_Mode").jqxRadioButton({groupName :"Panel1"});
                
                  
         SetRadioGroupChecked( GMoveFilesMode,   $("#mmMoveNormal_Mode"),  $("#mmOverwriteDest_Mode"), $("#mmRenameSource_Mode"), $("#mmDeleteIdenticalSource_Mode"), null, null );
                                                

         $("#jqxMove_MoveByCopyingCb").jqxCheckBox({ width: 350, height: 25, checked : GMove_MoveByCopyingCb });//, theme: 'shinyblack'
              

         $('#MoveDlg_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
         $('#MoveDlg_OK_btn').click(function () {

            GMove_MoveByCopyingCb = $("#jqxMove_MoveByCopyingCb").jqxCheckBox( 'val' );
            GMoveFilesMode = GetCheckedRadiobuttonName( $("#mmMoveNormal_Mode"),  $("#mmOverwriteDest_Mode"), $("#mmRenameSource_Mode"), $("#mmDeleteIdenticalSource_Mode"), null, null );
            $('#jqxMoveSettingsDlg').jqxWindow('close');
         });


         $('#MoveDlg_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
         $('#MoveDlg_Cancel_btn').click(function () {

            $('#jqxMoveSettingsDlg').jqxWindow('close');
         });
             
        $('#jqxMoveSettingsDlg').jqxWindow('open');
     }

     $("#CopyModeConfigBtn").jqxButton({height: GBtnHeight, width: GBtnWidth2,theme: 'energyblue'});
     $('#CopyModeConfigBtn').click(function ()
     {
       var Option = GetCheckedRadiobuttonName( $("#Standard_Copying_Mode"), $("#SmartTracking_Mode"), $("#Exact_Mirror_Mode"), $("#Move_Files_Mode"), null, null );
       if (Option == "SmartTracking_Mode" )
       {
         if (HTML_SmartTrackingSettingsDlg != '' )
         {
            $("#HTML_SmartTrackingSettingsDlg_div").html( HTML_SmartTrackingSettingsDlg );

             setTimeout(ShowSmartTrackingSettingsDlg, 100);
         }

       }
       else if (Option == "Exact_Mirror_Mode")
       {

         if (HTML_ExactMirrorSettingsDlg != '')
         {
            $("#HTML_ExactMirrorSettingsDlg_div").html( HTML_ExactMirrorSettingsDlg );
            setTimeout(ShowExactMirrorSettingsDlg, 100);
         }
                
       }
       else if ( Option == "Move_Files_Mode")
       {
           if (HTML_MoveSettingsDlg != '' )
           {
              $("#HTML_MoveSettingsDlg_div").html( HTML_MoveSettingsDlg );
               setTimeout(ShowMoveSettingsDlg, 100);
           }
       }
     });


//Tab Schedule/Schedule



//Tab Special

function XAttrDeps()
{
  var LCopyADS = $('#jqxCopyADSCb').jqxCheckBox('checked');

  if (!GisSyncoveryWindows)
     EnableCheckBox("jqxCompareADSCb",LCopyADS);

  EnableCheckBox("cbApplyADSToCompressedFiles",LCopyADS);
  EnableCheckBox("cbPutADSIntoCompressedFiles",LCopyADS);
  EnableCheckBox("cbFolderADSinMetadataFilesLeft",LCopyADS);
  EnableCheckBox("cbFolderADSinMetadataFilesRight",LCopyADS);
}

function ShowSpecial_AlternateDataStreamsDlg()
{
   var thisdlgheight = GisSyncoveryWindows ? 600 : 650;
   $('#jqxSpecial_AlternateDataStreamsDlg').jqxWindow({ maxWidth: 1000,  width:1000, maxHeight:thisdlgheight, height:thisdlgheight, autoOpen: false, isModal: true,
     theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });
   $('#jqxSpecial_AlternateDataStreamsTabs').jqxTabs({ width: 950, height: thisdlgheight-140});

   CreateCheckBoxWithValue('jqxCopyADSCb', GCopyADS);
   $("#jqxCopyADSCb").on('click', XAttrDeps );

   CreateCheckBoxWithValue('cbApplyADSToCompressedFiles',GApplyADSToCompressedFiles);
   CreateCheckBoxWithValue('cbPutADSIntoCompressedFiles',GPutADSIntoCompressedFiles);
   CreateCheckBoxWithValue('cbFolderADSinMetadataFilesLeft',GFolderADSinMetadataFilesLeft);
   CreateCheckBoxWithValue('cbFolderADSinMetadataFilesRight',GFolderADSinMetadataFilesRight);

   if (GisSyncoveryWindows)
      CreateCheckBoxWithValue('jqxSplitResourceForksCb',GSplitResourceForksCb);
   else
   {
      CreateCheckBoxWithValue('jqxCompareADSCb', GCompareADS);
      XAttrDeps();
   }

    $('#Special_AlternateDataStreams_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Special_AlternateDataStreams_OK_btn').click(function ()
    {
        GCopyADS = GetCheckBoxValue('jqxCopyADSCb');

        GApplyADSToCompressedFiles = GetCheckBoxValue('cbApplyADSToCompressedFiles');
        GPutADSIntoCompressedFiles = GetCheckBoxValue('cbPutADSIntoCompressedFiles');
        GFolderADSinMetadataFilesLeft = GetCheckBoxValue('cbFolderADSinMetadataFilesLeft');
        GFolderADSinMetadataFilesRight = GetCheckBoxValue('cbFolderADSinMetadataFilesRight');

        if (GisSyncoveryWindows)
           GSplitResourceForksCb = GetCheckBoxValue('jqxSplitResourceForksCb');
        else
           GCompareADS = GetCheckBoxValue('jqxCompareADSCb');

        $('#jqxSpecial_AlternateDataStreamsDlg').jqxWindow('close');
     });

    $('#Special_AlternateDataStreams_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

    $('#Special_AlternateDataStreams_Cancel_btn').click(function () {

       $('#jqxSpecial_AlternateDataStreamsDlg').jqxWindow('close');
    });

   $('#jqxSpecial_AlternateDataStreamsDlg').jqxWindow('open'); 
}

                                        
           
//Tab Schedule/RealTime
            
////////////////Real-Time Settings dialog////////////////////////////
function ShowRealTimeSettingsDlg()
{
    $('#jqxRealTimeSettingsDlg').jqxWindow({ maxWidth: 840,  width: 840, maxHeight:600, height:600, autoOpen: false, isModal: true,
       theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });
    $('#jqxReal_Tabs').jqxTabs({ width: 790,  height: 400 }); // initTabContent: Real_initWidgets
    $('#jqxRealDlg_RealTimeSynchronizationCb').jqxCheckBox({ width: 450, height: 25, checked : true});//, theme: 'shinyblack'
    $('#jqxRunCompletelyOnceCb').jqxCheckBox({ width: 450, height: 25, checked : GRunCompletelyOnceCb });//, theme: 'shinyblack'
   
    $('#Process_Each_FileRb').jqxRadioButton({ checked : !GRealtimeFolderMode });//, theme: 'shinyblack'
    $('#Process_Complete_FoldersRb').jqxRadioButton({ checked : GRealtimeFolderMode });//, theme: 'shinyblack'

    $('#jqxRealDlg_RealTimeDeletionsCb').jqxCheckBox({ width: 450, height: 25, checked : GRealTimeDeletions});//, theme: 'shinyblack'
    $('#jqxRealTimeDeletionsSafetyDelay_Input').jqxNumberInput({ width: 40,  height: 25, value: GRealTimeDeletionsSafetyDelay,
          inputMode: 'simple', decimalDigits: 0});//, theme: 'shinyblack'
                
    $('#jqxRealDlg_RealTimeRenamesCb').jqxCheckBox({ width: 450, height: 25, checked : GRealTimeRenames });//, theme: 'shinyblack'
    $('#jqxRealTimeIgnoreTempFilesCb').jqxCheckBox({ width: 450, height: 25, checked : GRealTimeIgnoreTempFiles});//, theme: 'shinyblack'

    $('#jqxRealtimeDelaySeconds_Input').jqxNumberInput({ width: 40,  height: 25, value: GRealtimeDelaySeconds, inputMode: 'simple', decimalDigits: 0});//, theme: 'shinyblack'
    $('#jqxFullRunBasedOnItemCount_Input').jqxNumberInput({ width: 40,  height: 25, value: GFullRunBasedOnItemCount, inputMode: 'simple', decimalDigits: 0 });//, theme: 'shinyblack'
    $('#jqxFullRunBasedOnTimeSeconds_Input').jqxNumberInput({ width: 40,  height: 25, value: GFullRunBasedOnTimeSeconds, inputMode: 'simple', decimalDigits: 0});//, theme: 'shinyblack'
    // new in V9
    $('#cbRealtimeCheckFTPForChanges').jqxCheckBox({ width: 700, height: 25, checked : GRealtimeCheckFTPForChanges });
    $('#cbUseFTPChangesTechniqueForLeftSide').jqxCheckBox({ width: 150, height: 25, checked : GUseFTPChangesTechniqueForLeftSide });
    $('#cbUseFTPChangesTechniqueForRightSide').jqxCheckBox({ width: 150, height: 25, checked : GUseFTPChangesTechniqueForRightSide });
    $('#edFTPChangesCheckIntervalSeconds').jqxNumberInput({ width: 40,  height: 25, value: GFTPChangesCheckIntervalSeconds, inputMode: 'simple', decimalDigits: 0 });

    $('#Real_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#Real_OK_btn').click(function () {

       $('#jqxRealTimeSynchronizationCb').jqxCheckBox({ checked: $('#jqxRealDlg_RealTimeSynchronizationCb').jqxCheckBox('checked') });
       GRunCompletelyOnceCb = $('#jqxRunCompletelyOnceCb').jqxCheckBox('checked');
       GRealtimeFolderMode = $('#Process_Complete_FoldersRb').jqxRadioButton('checked');
       GRealTimeDeletions = $('#jqxRealDlg_RealTimeDeletionsCb').jqxCheckBox('checked');
       GRealTimeDeletionsSafetyDelay = $('#jqxRealTimeDeletionsSafetyDelay_Input').jqxNumberInput( 'val' );
       GRealTimeRenames = $('#jqxRealDlg_RealTimeRenamesCb').jqxCheckBox('checked');
       GRealTimeIgnoreTempFiles = $('#jqxRealTimeIgnoreTempFilesCb').jqxCheckBox('checked');
       GRealtimeDelaySeconds = $('#jqxRealtimeDelaySeconds_Input').jqxNumberInput( 'val' );
       GFullRunBasedOnItemCount = $('#jqxFullRunBasedOnItemCount_Input').jqxNumberInput( 'val' );
       GFullRunBasedOnTimeSeconds = $('#jqxFullRunBasedOnTimeSeconds_Input').jqxNumberInput( 'val' );

       GRealtimeCheckFTPForChanges = $('#cbRealtimeCheckFTPForChanges').jqxCheckBox('checked');
       GUseFTPChangesTechniqueForLeftSide = $('#cbUseFTPChangesTechniqueForLeftSide').jqxCheckBox('checked');
       GUseFTPChangesTechniqueForRightSide = $('#cbUseFTPChangesTechniqueForRightSide').jqxCheckBox('checked');
       GFTPChangesCheckIntervalSeconds = $('#edFTPChangesCheckIntervalSeconds').jqxNumberInput('val');

       $('#jqxRealTimeSettingsDlg').jqxWindow('close');
    });

    $('#Real_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

    $('#Real_Cancel_btn').click(function () {

       $('#jqxRealTimeSettingsDlg').jqxWindow('close');
    });

    $('#jqxRealTimeSettingsDlg').jqxWindow('open');
               
      
}
////////////////Real-Time Settings dialog////////////////////////////
            
////////////////Files -> Deletions //////////////////////////


           

function ShowFoldersForDeletedFilesDlg()
{

    $('#jqxFoldersForDeletedFilesDlg').jqxWindow({ maxWidth: 710,  width: 710, maxHeight:480, height:480, autoOpen: false, isModal: true,
       theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });
                
    $("#inptMoveDeletedFilesIntoFolderL").jqxInput({ width : 580, height : 25}); //, theme: 'shinyblack'
    $("#inptMoveDeletedFilesIntoFolderL").jqxInput('val', GMoveDeletedFilesIntoFolderL);

    $("#inptMoveDeletedFilesIntoFolderR").jqxInput({ width : 580, height : 25}); //, theme: 'shinyblack'
    $("#inptMoveDeletedFilesIntoFolderR").jqxInput('val', GMoveDeletedFilesIntoFolderR);
               

    $("#btnDirSelectL").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#btnDirSelectL').click(function () {
      InitDirTreeSelectForm($("#inptMoveDeletedFilesIntoFolderL"), null, "left");
    });

    $("#btnDirSelectR").jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
    $('#btnDirSelectR').click(function () {
      InitDirTreeSelectForm($("#inptMoveDeletedFilesIntoFolderR"), null, "right");
    });


    $('#Files_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
                   
    $('#Files_OK_btn').click(function () {
       GMoveDeletedFilesIntoFolderL = $("#inptMoveDeletedFilesIntoFolderL").jqxInput('val');
       GMoveDeletedFilesIntoFolderR = $("#inptMoveDeletedFilesIntoFolderR").jqxInput('val');
       $('#jqxFilesDeletions_MoveFilesToSFolder').jqxCheckBox('checked', ( GMoveDeletedFilesIntoFolderL != "" ) || ( GMoveDeletedFilesIntoFolderR != "" ) );
                            

       $('#jqxFoldersForDeletedFilesDlg').jqxWindow('close');
    });

    $('#Files_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
  
    $('#Files_Cancel_btn').click(function () {

       $('#jqxFoldersForDeletedFilesDlg').jqxWindow('close');
    });





    $('#jqxFoldersForDeletedFilesDlg').jqxWindow('open');


}


/////////////////////////////////////////Tab Special


  function Show_Special_CacheDestinationFileListDlg( event )
  {
     if ($("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxCheckBox( 'disabled')) return;

     $("#HTML_CacheDestinationFileListDlg_div").html( HTML_CacheDestinationFileListDlg );
     $('#jqxSpecial_CacheDestinationFileListDlg').jqxWindow({ maxWidth: 400,  width: 400, maxHeight:280, height:280, autoOpen: false, isModal: true,
      theme: 'energyblue', animationType: 'slide', draggable: !GIsTabletApplication });
      

     $("#jqxSpecial_UseLocalDatabaseForCacheFileListCb").jqxCheckBox({ checked:  true });
     $("#jqxSpecial_DoubleCheckCacheHolesCb").jqxCheckBox({ checked:  GSpecial_DoubleCheckCacheHoles });

     $("#jqxSpecial_RefreshCacheEveryCb").jqxCheckBox({ checked:  GSpecial_RefreshCacheEvery > 0 });
     $("#jqxSpecial_RefreshCacheEveryCb").on( 'change', function (event) {

         if ($("#jqxSpecial_RefreshCacheEveryCb").jqxCheckBox('checked') == false )
         {
            $("#inptSpecial_RefreshCacheEvery").jqxNumberInput('val', 0 );
            $("#inptSpecial_RefreshCacheEvery").jqxNumberInput('disabled', true );
            $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput('val', 0 );
            $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput('disabled', true );
         }
         else
         {
            $("#inptSpecial_RefreshCacheEvery").jqxNumberInput('disabled', false );
            $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput('disabled', false );
         }

      } );

     $("#inptSpecial_RefreshCacheEvery").jqxNumberInput({ width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 });
     $("#inptSpecial_RefreshCacheEvery").jqxNumberInput('val', GSpecial_RefreshCacheEvery);
      
     $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput({ width: 30, height: 25, inputMode: 'simple', decimalDigits: 0 });
     $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput('val', GSpecial_CacheNotRefreshedCounter);
      

     $('#Special_CacheDestination_OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
     $('#Special_CacheDestination_OK_btn').click(function () {
        
        GSpecial_CacheDestinationFileList = $("#jqxSpecial_UseLocalDatabaseForCacheFileListCb").jqxCheckBox( 'val' );
        GSpecial_DoubleCheckCacheHoles = $("#jqxSpecial_DoubleCheckCacheHolesCb").jqxCheckBox( 'checked' );
        GSpecial_RefreshCacheEvery = $("#inptSpecial_RefreshCacheEvery").jqxNumberInput('val');
        GSpecial_CacheNotRefreshedCounter = $("#inptSpecial_CacheNotRefreshedCounter").jqxNumberInput('val');
        $('#jqxSpecial_CacheDestinationFileListDlg').jqxWindow('close');
          
     });
      
     $('#Special_CacheDestination_Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});
     $('#Special_CacheDestination_Cancel_btn').click(function () {
         $('#jqxSpecial_CacheDestinationFileListDlg').jqxWindow('close');
     });
                    
     $('#jqxSpecial_CacheDestinationFileListDlg').on('close', function (event) {

            
           $("#jqxSpecialSpFeatr_CacheDestinationFileListCb").jqxCheckBox( 'val',  GSpecial_CacheDestinationFileList );
            
     });

     $('#jqxSpecial_CacheDestinationFileListDlg').jqxWindow('open');

  };



///////////////////////////////////////////////Bottom form buttons


    $('#Cancel_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

       $('#Cancel_btn').click(function () {

          $('#jqxProfileEditorForm').jqxWindow('close');
       });

            
    $('#OK_btn').jqxButton({height: GBtnHeight, width: GBtnWidth,theme: 'energyblue'});

    $('#OK_btn').click(function ()
    {
         if (bTabsZipEncrypt &&
             ($("#jqxZippingEncrypt_Password").jqxPasswordInput('val') !=
              $("#jqxZippingEncrypt_Confirm").jqxPasswordInput('val')))
         {
            alert('ERROR: The password and confirmation fields on the Encryption tab sheet to not match.');
            exit;
         }


        var CurrentProfile = $("#inptProfileName").jqxInput('val');
        GLeftStoredPath = $("#inptLeftHandSide").jqxInput( 'val' );
        GRightStoredPath =  $("#inptRightHandSide").jqxInput( 'val' );

        PostProfileEditor(CurrentProfile, GCurrentProfileAction);
            
    });
                
    $('#jqxProfileEditorForm').on('close', function (event)
     {
       GProfileEditorFormOpen=false;
       $('#jqxTabs').jqxTabs('destroy');
       $('#jqxProfileEditorForm').jqxWindow('destroy');
       //enable scroll of main window
       if (GIsTabletApplication)
        {
          //enable horisontal scroll
           var $body = $(document);
           $body.unbind('scroll');
        }
     });


    MoreProfileEditorFormPreps();

      /*      $('#jqxProfileEditorForm').on('open', function (event) {
                $('#jqxProfileEditorForm').jqxWindow('focus');
               });
      */


           /*  for (var i = 0, len = $('#jqxTabs').jqxTabs('length'); i < len; i++) {
                var title =  $('#jqxTabs').jqxTabs('getTitleAt', i ).trim();
               $('#jqxTabs').jqxTabs('setTitleAt', i, title);

            }*/

    $('#jqxProfileEditorForm').jqxWindow('open');
    GProfileEditorFormOpen=true;
 }
 catch(err)
 {
    showstatusmessage("Error: "+err);
    alert('Error initializing profile editor dialog: '+err);
 }

 $('#jqxLoader').jqxLoader('close');
};

function MoreProfileEditorFormPreps()
{
  if (!GisSyncoveryWindows)
  {
    // $('#jqxScheduleRunUponWinLoginCb').css({"display":"none"});
    $('#jqxScheduleRunUponShutdownAndLogOutCb').css({"display":"none"});
    $('#jqxFilesMore_UseWindowsApi').css({"display":"none"});
    $('#jqxRealTimeSynchronizationCb').css({"display":"none"});
    $('#btnRealTimeSettings').css({"display":"none"});
    $('#jqxJob_RunAsUser').css({"display":"none"});
    $('#jqxFATakeAdminOwnershipCb').css({"display":"none"});
    $('#jqxJob_NetworkConnections').css({"display":"none"});
    $('#jqxJob_ShutdownLabel').css({"display":"none"});
    $('#jqxJob_WhenRunViaScheduler').css({"display":"none"});
    $('#jqxJob_WhenRunManuallyUnattended').css({"display":"none"});
    $('#jqxJob_WhenRunManuallyAttended').css({"display":"none"});
    $('#jqxJob_UseExternalCopyingTool').css({"display":"none"});
    $('#jqxJob_ShowCheckboxesInPreview').css({"display":"none"});
    $('#jqxFilesBypassFileBufferingLeftCb').css({"display":"none"});
    $('#jqxFilesBypassFileBufferingRightCb').css({"display":"none"});
    $('#BypassBufferingLabel').css({"display":"none"});

    $('#jqxComparStripReadOnlyAttrCb').css({"display":"none"});
    $('#jqxComparMoreDetectHardLinksCb').css({"display":"none"});

    $('#jqxMasks_ProcessReparsePointsCb').css({"display":"none"});
    $('#jqxMasks_FollowJunctionPointsFilesCb').css({"display":"none"});
    $('#jqxMasks_FollowJunctionPointsFoldersCb').css({"display":"none"});
    $('#jqxMasks_CopyOtherReparsePointsCb').css({"display":"none"});

    $('#inptSpecialSpFeatr_SetTargetVolumeLabel').css({"display":"none"});
    $('#lbSpecialSpFeatr_SetTargetVolumeLabel').css({"display":"none"});
  }

 GInternetProtocolSetLEFTRegistryList = [];
 GInternetProtocolSetRIGHTRegistryList = [];
 GInternetProtocolSetADDDESTRegistryList = [];
 GInternetProtocolSetLEFTRegistryList = deepCopy( GInternetProtocolSetRegistryList );
 GInternetProtocolSetRIGHTRegistryList = deepCopy( GInternetProtocolSetRegistryList );
 GInternetProtocolSetADDDESTRegistryList = deepCopy( GInternetProtocolSetRegistryList );
}

GFuncInitProfileEditorForm = InitProfileEditorForm;

