#define AppName "Lead Finder"
#define AppVersion "1.0"
#define AppPublisher "Michele Rucci"
#define AppURL "https://github.com/MicheleRucciDev/LeadFinder"
#define AppExeName "LeadFinder.exe"

[Setup]
AppId={{A1B2C3D4-E5F6-7890-ABCD-EF1234567890}
AppName={#AppName}
AppVersion={#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
DefaultDirName={autopf}\{#AppName}
DefaultGroupName={#AppName}
AllowNoIcons=yes
OutputDir=.
OutputBaseFilename=LeadFinder-Setup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
WizardResizable=no
PrivilegesRequired=admin
SetupIconFile=
UninstallDisplayName={#AppName}
UninstallDisplayIcon={app}\{#AppExeName}
DisableWelcomePage=no
LicenseFile=
MinVersion=10.0

[Languages]
Name: "italian";   MessagesFile: "compiler:Languages\Italian.isl"
Name: "english";   MessagesFile: "compiler:Default.isl"

[CustomMessages]
italian.Installing=Installazione di {#AppName} in corso...
italian.CheckingReqs=Controllo requisiti di sistema...
italian.InstallingPython=Installazione Python in corso (potrebbe richiedere qualche minuto)...
italian.InstallingNode=Installazione Node.js in corso (potrebbe richiedere qualche minuto)...
italian.InstallingDeps=Installazione dipendenze applicazione...
italian.SetupComplete=Installazione completata! Clicca Fine per avviare Lead Finder.
english.Installing=Installing {#AppName}...
english.CheckingReqs=Checking system requirements...
english.InstallingPython=Installing Python (this may take a few minutes)...
english.InstallingNode=Installing Node.js (this may take a few minutes)...
english.InstallingDeps=Installing application dependencies...
english.SetupComplete=Setup complete! Click Finish to launch Lead Finder.

[Tasks]
Name: "desktopicon"; Description: "Crea un'icona sul Desktop"; GroupDescription: "Icone aggiuntive:"
Name: "startmenuicon"; Description: "Crea voce nel menu Start"; GroupDescription: "Icone aggiuntive:"; Checked: yes

[Files]
; File principale launcher
Source: "..\LeadFinder.exe"; DestDir: "{app}"; Flags: ignoreversion; Check: ExeExists

; Backend
Source: "..\backend\app.py";           DestDir: "{app}\backend"; Flags: ignoreversion
Source: "..\backend\scraper.py";       DestDir: "{app}\backend"; Flags: ignoreversion
Source: "..\backend\extractor.py";     DestDir: "{app}\backend"; Flags: ignoreversion
Source: "..\backend\requirements.txt"; DestDir: "{app}\backend"; Flags: ignoreversion

; Frontend (escludi node_modules e dist)
Source: "..\front-end\src\*";       DestDir: "{app}\front-end\src";  Flags: ignoreversion recursesubdirs
Source: "..\front-end\index.html";  DestDir: "{app}\front-end";     Flags: ignoreversion
Source: "..\front-end\package.json"; DestDir: "{app}\front-end";    Flags: ignoreversion
Source: "..\front-end\vite.config.js";    DestDir: "{app}\front-end"; Flags: ignoreversion
Source: "..\front-end\tailwind.config.js"; DestDir: "{app}\front-end"; Flags: ignoreversion
Source: "..\front-end\postcss.config.js";  DestDir: "{app}\front-end"; Flags: ignoreversion

; Script di avvio
Source: "..\START.bat";  DestDir: "{app}"; Flags: ignoreversion
Source: "..\STOP.bat";   DestDir: "{app}"; Flags: ignoreversion

[Icons]
; Collegamento Desktop
Name: "{autodesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"; \
  Tasks: desktopicon; Comment: "Lead Finder - Local Lead Generation Tool"

; Menu Start
Name: "{group}\{#AppName}";         Filename: "{app}\{#AppExeName}"; Tasks: startmenuicon
Name: "{group}\Disinstalla {#AppName}"; Filename: "{uninstallexe}"

[Run]
; Installa dipendenze Python e Node dopo la copia dei file
Filename: "{app}\installer-helper.bat"; \
  Parameters: "{app}"; \
  StatusMsg: "{cm:InstallingDeps}"; \
  Flags: runhidden waituntilterminated

; Lancia l'app al termine
Filename: "{app}\{#AppExeName}"; \
  Description: "Avvia {#AppName} adesso"; \
  Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\backend\venv"
Type: filesandordirs; Name: "{app}\front-end\node_modules"
Type: filesandordirs; Name: "{app}\front-end\dist"

[Code]
var
  PythonOK, NodeOK: Boolean;

// ── Controlla se un comando esiste nel PATH ───────────────────────────────────
function CommandExists(Cmd: String): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec('cmd.exe', '/c where ' + Cmd + ' > nul 2>&1', '', SW_HIDE,
                 ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

// ── Installa Python via winget (silenzioso) ───────────────────────────────────
procedure InstallPython;
var
  ResultCode: Integer;
begin
  WizardForm.StatusLabel.Caption := ExpandConstant('{cm:InstallingPython}');
  Exec('winget.exe', 'install Python.Python.3.11 --silent --accept-package-agreements --accept-source-agreements',
       '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

// ── Installa Node.js via winget (silenzioso) ──────────────────────────────────
procedure InstallNode;
var
  ResultCode: Integer;
begin
  WizardForm.StatusLabel.Caption := ExpandConstant('{cm:InstallingNode}');
  Exec('winget.exe', 'install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements',
       '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

// ── Pagina di benvenuto custom ────────────────────────────────────────────────
procedure InitializeWizard;
begin
  WizardForm.WelcomeLabel1.Caption := 'Benvenuto in Lead Finder';
  WizardForm.WelcomeLabel2.Caption :=
    'Questo installer configurerà Lead Finder sul tuo computer.' + #13#10 + #13#10 +
    'Lead Finder è uno strumento per trovare automaticamente ' +
    'attività locali su Google Maps e identificare chi non ha ancora un sito web.' + #13#10 + #13#10 +
    'L''installazione richiede circa 2-5 minuti.' + #13#10 + #13#10 +
    'Clicca Avanti per continuare.';
end;

// ── Prima di installare: controlla e installa requisiti ───────────────────────
function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  Result := '';
  WizardForm.StatusLabel.Caption := ExpandConstant('{cm:CheckingReqs}');

  PythonOK := CommandExists('python');
  NodeOK   := CommandExists('node');

  if not PythonOK then
    InstallPython;

  if not NodeOK then
    InstallNode;

  // Ricontrolla dopo installazione
  PythonOK := CommandExists('python');
  NodeOK   := CommandExists('node');

  if not PythonOK then
    Result := 'Python non è stato installato correttamente. ' +
              'Scaricalo manualmente da https://www.python.org e riavvia l''installer.';

  if not NodeOK then
    Result := 'Node.js non è stato installato correttamente. ' +
              'Scaricalo manualmente da https://nodejs.org e riavvia l''installer.';
end;

// ── Controlla se LeadFinder.exe esiste ───────────────────────────────────────
function ExeExists: Boolean;
begin
  Result := FileExists(ExpandConstant('{src}\..\LeadFinder.exe'));
end;
