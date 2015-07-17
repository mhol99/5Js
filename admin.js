//---------------------------------------------------------------------------------------------------------------------------------------//
// Variable Declarations                                                                                                                 //
//---------------------------------------------------------------------------------------------------------------------------------------//

var noteLine =                 "-----------------------------------------", 
    doubleNoteLine =           noteLine+"\n\n"+noteLine,
    noteSignature =            "Systems Operations Monitor",
    processNoteHeader =        "Running process(es) at time of deactivation:\n",
    URLNoteHeader =            "URL(s):\n",
    usageNoteHeader =          "Usage\n",
    installedAppsNoteHeader  = "Installed Scripts at time of deactivation\n",
    evidenceNoteHeader  =      "Evidence of Problem\n",
    multipleDeactivations =    "*** Account has multiple deactivations, please handle each one individually ***\n\n",
    isStandardCPM = false,
    isResellerCPM = false,
    Normal = "Normal",
    Resold = "Resold",
    fEmail = "Email",
    fMalware = "Malware",
    fDatabase = "Database",
    fVarFull = "VarFull",
    fMalicious = "Malicious",
    fBackups = "Backups";

//---------------------------------------------------------------------------------------------------------------------------------------//
// Functions                                                                                                                             //
//---------------------------------------------------------------------------------------------------------------------------------------//
function createNote (noteHeading, noteCapture) {
    var returnString = "";
    (noteCapture === "") ? returnString = "\n\n" + noteHeading + doubleNoteLine : returnString = "\n\n" + noteHeading + noteLine + "\n" + noteCapture + "\n" + noteLine;
    return returnString; }

function highlight() {
    if ((isStandardCPM == true) || (isResellerCPM == true)) {
        usageLink = $('a[href^="/cgi/admin/user/usage/"]').css("font-size","20px").css("background-color","yellow")
        installedLink = $('a[href^="/cgi/admin/user/installedapps"]').css("color","green"),
        emailLink = $('a[href^="/cgi/admin/emailcustomer"]').css("font-size","15px").css("color","green") } }
        
function titleChange () {
    if ((isStandardCPM == true) || (isResellerCPM == true)) {
        document.title = ( $("#cpanelinfo_table nobr").text().substr(0,10) + ' - ' + document.title); } }

function floHead() {
    if ((isStandardCPM == true) || (isResellerCPM == true)) {
        $('.tbform').css('visibility', 'hidden');
        $('.qmmc').css('visibility', 'hidden');
        $('.menubutton').css('right', '10px'); 
        $('.menulogin').css('right', '10px'); 
        $('.adminmenubar').css('min-height','90px');
        $('.adminmenubar').prepend('<div id="accountAge"> </div>');
        $('.adminmenubar').prepend('<br style="clear: both">'); 
        $('.adminmenubar').css('position', 'fixed'); 
        $('.adminmenubar').css('top', '0px'); 
        $('.adminmenubar').css('width', '100%'); 
        $('.adminmenubar').css('margin-top', '0px'); 
        $('.adminmenubar').css('padding', '5px'); 
        $('.adminmenubar').css('padding-bottom', '5px'); 
        $('.adminmenubar').css('z-index', '11');
        $('.adminmenubar').css('opacity', '1')
        $('.adminmenubar').css('overflow', 'hidden'); 
        $('.adminmenubar').prependTo('body'); 
        $('body').prepend('<br /><br /><br /><br /><br /><br /><br /><br />');
        $('.redBad').css('position', 'fixed');
        $('.redBad').css('z-index', '11');
        $('.redBad').css('left', '72.5%');
        $('.redBad').css('top', '50px');
        $('.greenGood').css('position', 'fixed');
        $('.greenGood').css('left', '75%');
        $('.greenGood').css('z-index', '11');
        $('.greenGood').css('top', '50px'); } }

function headStation() {
    if ((isStandardCPM == true) || (isResellerCPM == true)) {
        $('.adminmenubar').css('min-height','100px'); } }

function injectCss() {
    var head = document.getElementsByTagName("head")[0],
        css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = 'https://box894.bluehost.com/~fivjssof/apps/js/cpm.css';
    head.appendChild(css); }

function createDiv() {
    var div = document.createElement("div");
    div.id = "accountAge";
    div.setAttribute("align","right");
    div.style.margin = "20px 0px 0px";
    document.body.appendChild(div); }

function lessThan30() {
    var divAge = document.getElementById("accountAge"),
        code ="<span class=\"redBad\">THIS ACCOUNT IS LESS THAN 30 DAYS OLD! It is " + totalDays + " days old!</span>";
    divAge.innerHTML = code; }

function moreThan30() {
    var divAge = document.getElementById("accountAge"),
        code ="<span class=\"greenGood\">This account is " + totalDays + " days old. About " + totalYears.toPrecision(2) + " years old.</span>";
    divAge.innerHTML = code; }

function daysBetween(date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24,
        date1_ms = date1.getTime(),
        date2_ms = date2.getTime(),
        difference_ms = Math.abs(date1_ms - date2_ms);
    return Math.round(difference_ms/oneDay); }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Display Buttons Depending on CPM Type                                                                                                 //
//---------------------------------------------------------------------------------------------------------------------------------------//

function displayCPMButtons () {
    $('.subtitle').append('<div id="CPMButtonTable"><fieldset id="fieldsetButtons" style="width:60%; position: relative;">'+
                          '<input type="radio" name="CPMType" onChange="switchButtonNames(Normal);" id="radioStandard">' +
                          '<label style="font-size:12px; color:White" for="Standard"> Standard </lable>'+
                          '<input type="radio" name="CPMType" onChange="switchButtonNames(Resold);" id="radioResold">' +
                          '<label style="font-size:12px; color:White" for="Reseller"> Reseller </lable>'+
                          '<input type="button" name="buttonSpam" value="Compromised Email" id="buttonSpam" class="btn">' +
                          '<input type="button" name="buttonMalware" value="Malware/Virus" id="buttonMalware" class="btn">' +
                          '<input type="button" name="buttonMysql" value="Database Issue" id="buttonMysql" class="btn">' +
                          '<input type="button" name="buttonVarTmp" value="Filling /var/tmp" id="buttonVarTmp" class="btn">' +
                          '<input type="button" name="buttonProcess" value="Malicious Process" id="buttonProcess" class="btn">' +
                          '<input type="button" name="buttonBackups" value="Backup Storage" id="buttonBackups" class="btn">' +
                          '</fieldset></div>');
    $('#fieldsetButtons').css('background-color',$('.adminmenubar').css('background-color'));
    if (isStandardCPM === true) {
        switchButtonNames(Normal);
        $('#radioStandard').attr('checked', 'checked');
        $('#radioResold').attr('disabled',true); }
    if (isResellerCPM === true) {
       switchButtonNames(Resold);
       $('#radioResold').attr('checked', 'checked'); } }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Set/Switch Set of Buttons to Display                                                                                                  //
//---------------------------------------------------------------------------------------------------------------------------------------//

function switchButtonNames(cType) {
    if (cType === Normal) {
        $('#buttonSpam').attr('value','Compromised Email').click(function() {showDivs(Normal,fEmail)});
        $('#buttonMalware').attr('value','Malware/Virus').click(function() {showDivs(Normal,fMalware)});
        $('#buttonMysql').attr('value','Database Issue').click(function() {showDivs(Normal,fDatabase)});
        $('#buttonVarTmp').attr('value','Filling /var/tmp').click(function() {showDivs(Normal,fVarFull)});
        $('#buttonProcess').attr('value','Malicious Process').click(function() {showDivs(Normal,fMalicious)});
        $('#buttonBackups').attr('value','Backup Storage').click(function() {showDivs(Normal,fBackups)}); }
    if (cType === Resold) {
        $('#buttonSpam').attr('value','Resold Compromised Email').click(function() {showDivs(Resold,fEmail)});
        $('#buttonMalware').attr('value','Resold Malware/Virus').click(function() {showDivs(Resold,fMalware)});
        $('#buttonMysql').attr('value','Resold Database Issue').click(function() {showDivs(Resold,fDatabase)});
        $('#buttonVarTmp').attr('value','Resold Filling /var/tmp').click(function() {showDivs(Resold,fVarFull)});
        $('#buttonProcess').attr('value','Resold Malicious Process').click(function() {showDivs(Resold,fMalicious)});
        $('#buttonBackups').attr('value','Resold Backup Storage').click(function() {showDivs(Resold,fBackups)}); } }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Generate Hidden Fields and Buttons for Data Entry                                                                                     //
//---------------------------------------------------------------------------------------------------------------------------------------//

function createCPMDivs () {
    $('.subtitle').append('<div id="CPMDivTable" hidden><table>' +
                          '<tr id="multipleDiv"><td><font size="2">Has Previous Deactivations: </font></td><td><input type="checkbox" id="multipleCB"></td></tr>' +
                          '<tr id="resoldDiv"><td><font size="2">Resold Account:</font></td><td><input style="font-size:12px" type="text" id="emailResold"></td></tr>' +
                          '<tr id="addressDiv"><td><font size="2">Email Address:</font></td><td><input style="font-size:12px" type="text" id="emailAddress"></td></tr>' +
                          '<tr id="evidenceDiv"><td><font size="2">Evidence:</font></td><td><textarea cols="30" style="font-size:12px" id="evidenceText"></textarea></td></tr>' +
                          '<tr id="URLDiv"><td><font size="2">URL(s):</font></td><td><textarea cols="30" style="font-size:12px" id="URLEvidence"></textarea></td></tr>' +
                          '<tr id="usageDiv">' +
                          '    <td>' +
                          '        <p><font size="2">Usage:     </font><input type="checkbox" id="commentSpam"><font size="2">Comment Spam:</font></p>' +
                          '        <p><input type="checkbox" id="userSpam"><font size="2">User Spam:</font><input type="checkbox" id="postSpam"><font size="2">Post Spam:</font></p>' +
                          '    </td>' +
                          '    <td><textarea cols="30" style="font-size:12px" id="usageText"></textarea></td>' +
                          '</tr>' +
                          '<tr id="runningProcessDiv">' +
                          '    <td><font size="2">Running Process(es):</font></td>' +
                          '    <td><textarea cols="30" style="font-size:12px" id="processText"></textarea></td>' +
                          '</tr>' +
                          '<tr id="installedAppsDiv">' +
                          '    <td>' +
                          '        <p><font size="2">Installed Apps:</font></p>' +
                          '        <p><input type="checkbox" id="noInstalledApps"><font size="2">None Detected:</font></p>' +
                          '    </td>' +
                          '    <td><textarea cols="30" style="font-size:12px" id="installedApps"></textarea></td>' +
                          '</tr>' +
                          '<tr id="continueButton"><td><input type="button" name="buttonContinue" value="Continue" id="buttonContinue" class="btn"></td><td></td></tr>' +
                          '</table></div>');
    hideCPMDivs(); }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Hide Entry Fields                                                                                                                     //
//---------------------------------------------------------------------------------------------------------------------------------------//

function hideCPMDivs () {
    $('#multipleDiv').hide();
    $('#addressDiv').hide();
    $('#resoldDiv').hide();
    $('#evidenceDiv').hide();
    $('#URLDiv').hide();
    $('#installedAppsDiv').hide();
    $('#usageDiv').hide();
    $('#runningProcessDiv').hide();
    $('#continueButton').hide(); }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Show Divs Based On Function Being Called                                                                                              //
//---------------------------------------------------------------------------------------------------------------------------------------//

function showDivs (cType, whichFunction) {
    hideCPMDivs();
    $('#CPMDivTable').show();
    $('#multipleDiv').show();
    switch (whichFunction) {
        case "Email":
            $('#addressDiv').show();
            $('#evidenceDiv').show();
            break;
        case "Malware":
            $('#URLDiv').show();
            $('#installedAppsDiv').show();
            break;
        case "Database":
            $('#usageDiv').show();
            $('#runningProcessDiv').show();
            $('#installedAppsDiv').show();
            break;
        case "VarFull":
            $('#evidenceDiv').show();
            break;
        case "Malicious":
            $('#runningProcessDiv').show();
            $('#installedAppsDiv').show();
            break;
        case "Backups":
            $('#evidenceDiv').show();
            break; }
        if (cType === Normal) {
            $('#continueButton').show().click(function() {hideDivs(Normal, whichFunction)}); }
        else {
            $('#resoldDiv').show(); $('#continueButton').show().click(function() {hideDivs(Resold, whichFunction)}); } }    

function hideDivs (cType, whichFunction) {
    var notes = $('#notes'),
        deacNote = "",
        emailAddress = $('#emailAddress').val(),
        emailEvidence = $('#evidenceText').val(),
        resoldAccount = $('#emailResold').val(),
        URLNote = $('#URLEvidence').val(),
        installedAppsNote =$('#installedApps').val();
        usageNote = $('#usageText').val(),
        processNote = $('#processText').val(),
        evidenceNote = $('#evidenceText').val(),
        dbProblemNote = "",
        totalProblems = 0;

    console.log (cType);
    if ($('#multipleCB').prop('checked')) {
        deacNote = deacNote + multipleDeactivations; }
    switch (whichFunction) {
        case "Email":
            if (emailAddress === null) {
                emailAddress = "XXXXX"; }
            if (cType === Normal) {
                deacNote = deacNote + "Customers Email Address ( " + emailAddress + " ) is compromised. Customer needs to change its password or remove it from the account.";
                $('#cpflag_o').prop('checked',true);         // Set Outbound Email Flag to Not Allowed
                $('#cpflag_s').prop('checked',true); }       // Set Scripted Sendmail Flag to Not Allowed
            if (cType === Resold) {
                deacNote = deacNote + "Resold Account ( " + resoldAccount + " ) has a compromised email address ( " + emailAddress + " ). Force changed the email address password."; }
            deacNote = deacNote + createNote (evidenceNoteHeader,emailEvidence);
            break;
        case "Malware":
            if ($('#noInstalledApps').prop('checked')) {
                installedAppsNote = 'None Detected.'; }
            if (cType === Normal) {
                deacNote = deacNote + "Customer has hacked files on the account.";
                $('#cpflag_d').prop('checked',true);         // Set Deactivated Flag
                $('#d_reason').prop('value',7);              // Set Reason To Malware/Virus
                $('#cpflag_de_cpanel').prop('checked',true); // Set cPanel Access To Allowed
                $('#cpflag_s').prop('checked',true);         // Set Scipted Sendmail Flag to Not Allowed
                $('#cpflag_sw').prop('checked',true); }      // Set Suspend Website Flag to Not Allowed
            if (cType === Resold) {
               deacNote = deacNote + "Resold Account ( "+resoldAccount+" ) has malware on the account that is causing performance problems and needs to be addressed."; }
            deacNote = deacNote + createNote(URLNoteHeader,URLNote) +
                                  createNote(installedAppsNoteHeader,installedAppsNote) +
                                  "\n\nCustomer must do the following:\n\n" +
                                  "1) Remove ALL malware from the account.\n" +
                                  "2) Upgrade ANY installed scripts.\n" +
                                  "3) Change cPanel, FTP and any website passwords for the installed scripts.";
            break;
        case "Database":
            if ($('#commentSpam').prop('checked')) { dbProblemNote = dbProblemNote + "Comment"; totalProblems++; }
            if ($('#postSpam').prop('checked')) {
                (totalProblems > 0) ? dbProblemNote += ", Post" : dbProblemNote += "Post"; 
                totalProblems++; }
            if ($('#userSpam').prop('checked')) {
                (totalProblems > 0) ? dbProblemNote += ", User" : dbProblemNote += "User";
                totalProblems++; }
            if ($('#noInstalledApps').prop('checked')) {
                installedAppsNote = 'None Detected.'; }
            if (cType === Normal) {
                ( totalProblems > 0 ) ? deacNote += "Customer is abusing the CPU - Customer is being [ " + dbProblemNote + " ] spammed." : deacNote += "Customer is abusing the CPU - Customer has a database with [ Slow Queries ].";
                $('#cpflag_d').prop('checked',true);           // Set Deactivated Flag
                $('#d_reason').prop('value',8);                // Set Reason To Performance
                $('#cpflag_sw').prop('checked',true);          // Set Suspend Website Flag to Not Allowed
                $('#cpflag_de_cpanel').prop('checked',true); } // Set cPanel Access To Allowed
            if (cType === Resold) {
                deacNote = deacNote + "Resold Account ( "+resoldAccount+" ) is abusing the CPU - Customer is being [ " + dbProblemNote + " ] spammed."; }
            deacNote = deacNote + createNote (usageNoteHeader,usageNote) +
                                  createNote (processNoteHeader,processNote) +
                                  createNote (installedAppsNoteHeader,installedAppsNote) +
                                  "\n\n1) Customer needs to remove excess comments from problem database(s).\n" +
                                  "2) Install a CAPTCHA plugin.\n" +
                                  "3) Determine if they want comments allowed and make appropriate changes to their configuration.";
            break;
        case "VarFull":
            if (cType === Resold) {
                deacNote = deacNote + "Resold Account ( "+resoldAccount+" ) has a process/plugin that is filling the /VAR/TMP folder." };
            if (cType === Normal) {
                deacNote = deacNote + "Customer has a process/plugin that is filling the /VAR/TMP folder."; 
                $('#cpflag_d').prop('checked',true);         // Set Deactivated Flag
                $('#d_reason').prop('value',15);             // Set Reason To Backup/Storage
                $('#cpflag_de_cpanel').prop('checked',true); // Set cPanel Access To Allowed
                $('#cpflag_sw').prop('checked',true); }      // Set Suspend Website Flag to Not Allowed
            deacNote = deacNote + createNote (evidenceNoteHeader,evidenceNote) +
                                  "\n\n\Files have been moved to customers HOME folder for review.\n\n"+
                                  "Files have been removed.\n\n"+
                                  "Customer needs to check/change configuration of process/plugin.";
            break;
        case "Malicious":
            if ($('#noInstalledApps').prop('checked')) {
                installedAppsNote = 'None Detected.'; }
            if (cType === Resold) {
                deacNote = deacNote + "Resold Account ( "+resoldAccount+" ) is executing (a) malicious process(es) from a file location that no longer exists."; }
            if (cType === Normal) {
                deacNote = deacNote + "Customer has hacked files on the account. Customer is executing (a) malicious process(es) from a file location that no longer exists.";
                $('#cpflag_d').prop('checked',true);         // Set Deactivated Flag
                $('#d_reason').prop('value',7);              // Set Reason To Malware/Virus
                $('#cpflag_de_cpanel').prop('checked',true); // Set cPanel Access To Allowed
                $('#cpflag_s').prop('checked',true);         // Set Scipted Sendmail Flag to Not Allowed
                $('#cpflag_sw').prop('checked',true); }        // Set Suspend Website Flag to Not Allowed
            deacNote = deacNote + createNote (processNoteHeader,processNote) +
                                  createNote (installedAppsNoteHeader,installedAppsNote) +
                                  "\n\n\Customer must do the following:\n\n" +
                                  "1) Remove ALL malware from the account.\n" +
                                  "2) Upgrade ANY installed scripts.\n" +
                                  "3) Change cPanel, FTP and any website passwords for the installed scripts.";
           break;
        case "Backups":
            if (cType === Resold) {
                deacNote = deacNote + "Resold Account ( "+resoldAccount+" ) backups being stored on account that violate the Terms of Service Agreement." };
            if (cType === Normal) {
                deacNote = deacNote + "Customer has backups being stored on account that violate the Terms of Service Agreement."; 
                $('#cpflag_d').prop('checked',true);         // Set Deactivated Flag
                $('#d_reason').prop('value',15);             // Set Reason To Backup/Storage
                $('#cpflag_de_cpanel').prop('checked',true); // Set cPanel Access To Allowed
                $('#cpflag_sw').prop('checked',true); }      // Set Suspend Website Flag to Not Allowed
            deacNote = deacNote + createNote (evidenceNoteHeader,evidenceNote) +
                                  "\n\nCustomer needs to remove excess backups from account."; }    
    notes.trigger('focus');
    notes.val(deacNote);
    hideCPMDivs();
    var divTable = $('#CPMDivTable').hide(); }

//---------------------------------------------------------------------------------------------------------------------------------------//
// Add Email Message Notes                                                                                                               //
//---------------------------------------------------------------------------------------------------------------------------------------//

function expandEmail() {
    if ($('span.title').text()=='Email Customer') {
        $('.title').append('<br><input type="button" value="Compromised Email Standard" onclick="emailMessageInsertStandard()" id="buttonEmailMessage" class="btn">');
        $('.title').append('<input type="button" value="Compromised Email Resold" onclick="emailMessageInsertResold()" id="buttonEmailMessage1" class="btn">');
        $('.title').append('<input type="button" value="Malware Email Resold" onclick="emailMessageInsertMalwareResold()" id="buttonEmailMessage2" class="btn">');
        $('.title').append('<input type="button" value="Database Issue Resold" onclick="emailMessageDatabaseIssue()" id="buttonEmailMessage3" class="btn">');
        $('#message').css('width','1000px');
        $('#message').css('height','500px'); } }

function emailMessageInsertStandard() {
    var emailAddress = prompt("Compromised Email Address ?",""),
        emailMessageText = "Hello,\n\n"+
           "We are contacting you today because one or more of your email accounts are compromised. The emails being sent resulted in one of our email servers getting blacklisted, which means that this email server is essentially disabled. We have suspended your outbound email until corrective actions can be taken. Your website will still be functional. You cannot send or receive emails until you reset the password(s) for the email account(s). Please contact us for reactivation once the passwords have been changed in the cPanel.\n\n" +
           "The affected email account(s) is/are: " + emailAddress + "\n\n" +
           "To have your email services restored, we need you to update the password(s) for the affected email account(s). We highly recommend that you use very strong passwords.\n\n"+
           "Sometimes deciding on a secure password can be difficult. Here are some ideas to help strengthen your password(s):\n\n" +
           "1.	Use Different Character Classes - Many systems require that your password be from a variety of character classes. The letters [a-z] are one character class, [A-Z] is another, [0-9] is another, and symbols are a fourth. In general the more character classes used in your password, the more secure it is. So 'guitar' is less secure than GuiTar which is less secure than Gu1T&r. You can make a password much more secure by mixing different types of characters. Use some uppercase letters along with lowercase letters, numbers and even special characters such as '&' or '%'.\n" +
           "2.	Use Letters from a Phrase â€“ Use the first letter from each word in a phrase, line from a song, etc. 'Thereâ€™s a hole in the bottom of the sea.' could become Tahitbots.\n" +
           "3.	Take a word (for example, money), spell it backwards (yenom) and put your birth date in between. Say you were born February 5, 1974. So it would be yfebe5n19o74m. Hard to remember, yes, but also nearly impossibly to crack.\n" +
           "4.	Use More Than One Word - Single word passwords are easy to break. If a hacker runs a program to try a bunch of words from the dictionary they shouldnâ€™t be able to figure out your password. Choose words that you will remember, but that someone else wonâ€™t be able to guess. So a password like shinynail or flyingrock or tallwater are more secure than single word passwords.\n" +
           "5.	Choose two objects from a picture that youâ€™ll always remember. For example: a drawing at your grandparents house, the illustration from a childrenâ€™s book, a painting at an art museum, etc.\n" +
           "6.	Choose two terms from a memorable purchase. For example: bluev6 (first car), thinibm (first computer), gold3crt (engagement ring), 7ftgrand (piano), pinedoor (first house), sunshore (honeymoon destination).\n" +
           "7.	Look through a catalog and choose terms based on something you see in there.\n" +
           "8.	Look up a random article on Wikipedia and choose a word found or related to a word you find in the article.\n" +
           "9.	Separate Your Two Words With Symbols and Numbers- For example: pine&1&door, kit!2!cat, etc.\n" +
           "10.	Keyboard Patterns â€“ Creating terms from rows of adjacent keys. 12345 is not very good, but ][po combined in the ways specified above can make for a secure password that would be very difficult to guess and is fast to type.\n" +
           "11.	Do not use personal information. You should never use personal information as a part of your password. It is very easy for someone to guess things like your last name, pet's name, child's birth date and other similar details.\n" +
           "12.	For even more security, try to use 'nonsense words.' Combine these with numbers to make memorable, secure passwords. For example, 'brickbeak9468.'\n\n" +
           "Above all, do not tell anybody your password. Somebody could overhear you, or the person you told could let it slip. Also, do not write your password anywhere where it might be seen or found.\n\n" +
           "We also suggest that you secure your home computer by using an up-to-date anti-virus program; if you already use an anti-virus program, download and try a different anti-virus program, which may scan for different issues.\n\n" +
           "Once you have updated the password(s) for the affected email account(s) or you have removed the account(s) if no longer needed, either reply back to this email, call us, or contact us by Live Chat; whichever is easiest for you. We will verify that the email password(s) have been changed and reactivate your email services.\n\n" +
           "We appreciate your attention to this matter.\n\n"+
           noteSignature;
    $('#message').val(emailMessageText); }

function emailMessageInsertResold() {
    var emailAddress = prompt("Resold Compromised Email Address ?",""),
        resoldAccount = prompt("Resold Account ?",""),
        emailMessageText = "Dear Reseller,\n\n"+
           "We have changed the password(s) for the ( "+emailAddress+" ) email account(s) on the resold account ( "+resoldAccount+" ).\n\n"+
           "The email account(s) is/are compromised and sent massive amounts of SPAM through the mail servers. Please address this problem with your customer.\n\n" +
           noteSignature;
    $('#message').val(emailMessageText); }
    
function emailMessageInsertMalwareResold() {
    var resoldAccount = prompt("Resold Account ?",""),
        insertURL = prompt("Malicious URL ?","");
    (insertURL === "") ? insertURL = URLNote : insertURL = "URL(s):\n"+noteLine+"\n"+insertURL+"\n"+noteLine+"\n";
    var emailMessageText = "Dear Reseller,\n\n"+
                           "We have deactivated the resold account ( "+resoldAccount+" ) on our side.\n\n"+
                           "This customer of yours has at least one hacked file that has been causing performance problems with the server that your account resides on.\n\n" +
                           insertURL + "\n\n" +
                           "Either yourself or the customer will need to do the following:\n\n" +
                           "1) Remove ALL malware from the resold account.\n" +
                           "2) Upgrade ANY installed scripts.\n" +
                           "3) Change cPanel, FTP and any website passwords for the installed scripts.\n\n" +
                           "After these steps have been taken, you need to contact the Terms of Service Department to have the account unlocked from our side.\n\n" +
                           noteSignature;
    $('#message').val(emailMessageText); }

function emailMessageDatabaseIssue() {
    var resoldAccount = prompt("Resold Account ?",""),
        emailMessageText = "Dear Reseller,\n\n"+
                           "We have deactivated the resold account ( "+resoldAccount+" ).\n\n"+
                           "This customer of yours has a database that is abusing the server. This can be in the form of comment, post, or user registration spam.\n\n" +
                           "Either yourself or the customer will need to do the following:\n\n" +
                           "1) Change database options to disallow account creations to the site(s) without moderation.\n" +
                           "2) Change database options to disallow comments and posts to be made without moderation.\n" +
                           "3) Upgrade ANY installed scripts.\n\n" +
                           "After these steps have been taken, you need to contact Support for assistance in reactivating the account.\n\n" +
                           noteSignature;
    $('#message').val(emailMessageText); }
  
//---------------------------------------------------------------------------------------------------------------------------------------//
// Main Program                                                                                                                          //
//---------------------------------------------------------------------------------------------------------------------------------------//

$('#notes').val("");

if ($('span.title').text() == 'cPM') { isStandardCPM = true; isResellerCPM = false; }
if ($('span.subtitle').text().indexOf("RESELLER") > 0) { isResellerCPM = true; isStandardCPM = false; }

var currentDate = new Date(),
    accountStart = new Date(),
    accountDate = $('#cpanelinfo_table tr th:contains("Signup Date")').parent().text();

accountStart.setYear(accountDate.substr(52,4))
accountStart.setMonth(accountDate.substr(46,2)-1)
accountStart.setDate(accountDate.substr(49,2))

var totalDays = daysBetween(currentDate, accountStart),
    totalYears = totalDays / 365;

(totalDays < 30) ? setTimeout("lessThan30()",1000) : setTimeout("moreThan30()",1000);

expandEmail();
createDiv();
injectCss();
titleChange();
floHead();
highlight();
displayCPMButtons();
createCPMDivs();
