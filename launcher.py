import customtkinter as ctk
import subprocess
import threading
import os
import sys
import webbrowser
import time
from pathlib import Path

# Base directory: funziona sia come script che come .exe compilato
if getattr(sys, 'frozen', False):
    BASE_DIR = Path(sys.executable).parent
else:
    BASE_DIR = Path(__file__).parent

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")


class App(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Lead Finder")
        self.geometry("560x520")
        self.resizable(False, False)
        self.configure(fg_color="#030712")

        self.backend_proc  = None
        self.frontend_proc = None
        self.is_running    = False

        self._build_ui()
        self.protocol("WM_DELETE_WINDOW", self._on_close)

    # ── UI ────────────────────────────────────────────────────────────────────
    def _build_ui(self):

        # Header
        header = ctk.CTkFrame(self, fg_color="#0A1020", corner_radius=0, height=88)
        header.pack(fill="x")
        header.pack_propagate(False)

        inner = ctk.CTkFrame(header, fg_color="transparent")
        inner.place(relx=0.5, rely=0.5, anchor="center")

        ctk.CTkLabel(inner, text="🎯", font=ctk.CTkFont(size=34)).pack(side="left", padx=(0, 10))

        title_col = ctk.CTkFrame(inner, fg_color="transparent")
        title_col.pack(side="left")
        ctk.CTkLabel(title_col, text="Lead Finder",
                     font=ctk.CTkFont(size=26, weight="bold"),
                     text_color="#FFFFFF").pack(anchor="w")
        ctk.CTkLabel(title_col, text="Local lead generation tool",
                     font=ctk.CTkFont(size=11),
                     text_color="#475569").pack(anchor="w")

        # Status bar
        status = ctk.CTkFrame(self, fg_color="#080F1E",
                              border_color="#1E293B", border_width=1,
                              corner_radius=10)
        status.pack(fill="x", padx=18, pady=(14, 0))

        # Backend
        bf = ctk.CTkFrame(status, fg_color="transparent")
        bf.pack(side="left", padx=18, pady=10)
        self.b_dot = ctk.CTkLabel(bf, text="●", font=ctk.CTkFont(size=13), text_color="#334155")
        self.b_dot.pack(side="left")
        ctk.CTkLabel(bf, text="  Backend", font=ctk.CTkFont(size=12), text_color="#64748B").pack(side="left")
        self.b_lbl = ctk.CTkLabel(bf, text="  offline", font=ctk.CTkFont(size=11), text_color="#334155")
        self.b_lbl.pack(side="left")

        # Separator
        ctk.CTkLabel(status, text="|", text_color="#1E293B").pack(side="left")

        # Frontend
        ff = ctk.CTkFrame(status, fg_color="transparent")
        ff.pack(side="left", padx=18, pady=10)
        self.f_dot = ctk.CTkLabel(ff, text="●", font=ctk.CTkFont(size=13), text_color="#334155")
        self.f_dot.pack(side="left")
        ctk.CTkLabel(ff, text="  Frontend", font=ctk.CTkFont(size=12), text_color="#64748B").pack(side="left")
        self.f_lbl = ctk.CTkLabel(ff, text="  offline", font=ctk.CTkFont(size=11), text_color="#334155")
        self.f_lbl.pack(side="left")

        # URL (right side)
        self.url_lbl = ctk.CTkLabel(status, text="localhost:3000",
                                     font=ctk.CTkFont(size=10, family="Consolas"),
                                     text_color="#1E293B")
        self.url_lbl.pack(side="right", padx=14)

        # Log box
        self.log_box = ctk.CTkTextbox(
            self, height=178,
            fg_color="#06090F",
            border_color="#1E293B", border_width=1,
            text_color="#475569",
            font=ctk.CTkFont(family="Consolas", size=11),
            corner_radius=10,
        )
        self.log_box.pack(fill="x", padx=18, pady=12)
        self.log_box.configure(state="disabled")
        self._log("Lead Finder Launcher v1.0")
        self._log("Premi START per avviare l'applicazione.")

        # START / STOP button
        self.main_btn = ctk.CTkButton(
            self, text="▶   START",
            font=ctk.CTkFont(size=15, weight="bold"),
            fg_color="#6366F1", hover_color="#4F52C9",
            height=50, corner_radius=10,
            command=self._toggle,
        )
        self.main_btn.pack(fill="x", padx=18, pady=(0, 8))

        # Open browser button
        self.browser_btn = ctk.CTkButton(
            self, text="🌐   Apri nel browser",
            font=ctk.CTkFont(size=12),
            fg_color="#0C1428", hover_color="#1E293B",
            border_color="#1E293B", border_width=1,
            text_color="#64748B",
            height=38, corner_radius=10,
            state="disabled",
            command=lambda: webbrowser.open("http://localhost:3000"),
        )
        self.browser_btn.pack(fill="x", padx=18, pady=(0, 8))

        # Desktop shortcut button
        self.desk_btn = ctk.CTkButton(
            self, text="🖥   Crea collegamento sul Desktop",
            font=ctk.CTkFont(size=11),
            fg_color="transparent", hover_color="#0C1428",
            border_color="#1E293B", border_width=1,
            text_color="#334155",
            height=34, corner_radius=10,
            command=self._create_shortcut,
        )
        self.desk_btn.pack(fill="x", padx=18, pady=(0, 14))

    # ── Helpers ───────────────────────────────────────────────────────────────
    def _log(self, msg):
        self.log_box.configure(state="normal")
        self.log_box.insert("end", f"  › {msg}\n")
        self.log_box.see("end")
        self.log_box.configure(state="disabled")

    def _set_backend(self, on: bool):
        c = "#10B981" if on else "#334155"
        self.b_dot.configure(text_color=c)
        self.b_lbl.configure(text="  online" if on else "  offline", text_color=c)

    def _set_frontend(self, on: bool):
        c = "#10B981" if on else "#334155"
        self.f_dot.configure(text_color=c)
        self.f_lbl.configure(text="  online" if on else "  offline", text_color=c)
        self.url_lbl.configure(text_color="#6366F1" if on else "#1E293B")

    # ── Start / Stop ──────────────────────────────────────────────────────────
    def _toggle(self):
        if self.is_running:
            self._stop()
        else:
            self.main_btn.configure(state="disabled", text="Avvio in corso...")
            threading.Thread(target=self._start, daemon=True).start()

    def _start(self):
        try:
            venv = BASE_DIR / "backend" / "venv"
            pip  = venv / "Scripts" / "pip.exe"
            py   = venv / "Scripts" / "python.exe"

            if not venv.exists():
                self._log("Creo ambiente virtuale Python...")
                subprocess.run([sys.executable, "-m", "venv", str(venv)],
                               capture_output=True)
                self._log("Installo dipendenze Python...")
                subprocess.run([str(pip), "install", "-r",
                                str(BASE_DIR / "backend" / "requirements.txt"), "-q"],
                               capture_output=True)
                self._log("Dipendenze installate.")

            self._log("Avvio backend Flask...")
            self.backend_proc = subprocess.Popen(
                [str(py), "app.py"],
                cwd=str(BASE_DIR / "backend"),
                creationflags=subprocess.CREATE_NO_WINDOW,
            )
            time.sleep(3)
            self._set_backend(True)
            self._log("Backend pronto su porta 5000.")

            nm = BASE_DIR / "front-end" / "node_modules"
            if not nm.exists():
                self._log("Installo dipendenze Node (prima volta)...")
                subprocess.run("npm install", cwd=str(BASE_DIR / "front-end"),
                               capture_output=True, shell=True)

            self._log("Avvio frontend React...")
            self.frontend_proc = subprocess.Popen(
                "npm run dev",
                cwd=str(BASE_DIR / "front-end"),
                creationflags=subprocess.CREATE_NO_WINDOW,
                shell=True,
            )
            time.sleep(5)
            self._set_frontend(True)
            self._log("Frontend pronto su porta 3000.")

            self._log("Apertura browser...")
            webbrowser.open("http://localhost:3000")

            self.is_running = True
            self.main_btn.configure(
                state="normal", text="⏹   STOP",
                fg_color="#EF4444", hover_color="#DC2626",
            )
            self.browser_btn.configure(state="normal",
                                       text_color="#94A3B8",
                                       border_color="#334155")
            self._log("✓ Lead Finder è in esecuzione!")

        except Exception as e:
            self._log(f"Errore: {e}")
            self.main_btn.configure(state="normal", text="▶   START")

    def _stop(self):
        if self.backend_proc:
            self.backend_proc.terminate()
            self.backend_proc = None
        if self.frontend_proc:
            self.frontend_proc.terminate()
            self.frontend_proc = None

        subprocess.run("taskkill /F /IM node.exe /T",
                       capture_output=True, shell=True)

        self.is_running = False
        self._set_backend(False)
        self._set_frontend(False)
        self.browser_btn.configure(state="disabled",
                                   text_color="#334155",
                                   border_color="#1E293B")
        self.main_btn.configure(text="▶   START",
                                fg_color="#6366F1", hover_color="#4F52C9")
        self._log("Tutti i servizi fermati.")

    # ── Desktop shortcut ──────────────────────────────────────────────────────
    def _create_shortcut(self):
        try:
            desktop = os.path.join(os.environ["USERPROFILE"], "Desktop")
            # Target: se esiste il .exe compilato usa quello, altrimenti il .bat
            exe = BASE_DIR / "launcher.exe"
            target = str(exe) if exe.exists() else str(BASE_DIR / "START.bat")

            vbs = f'''
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = "{desktop}\\Lead Finder.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "{target}"
oLink.WorkingDirectory = "{BASE_DIR}"
oLink.Description = "Lead Finder Dashboard - Local Lead Generation"
oLink.Save
MsgBox "Collegamento creato sul Desktop!", 64, "Lead Finder"
'''
            vbs_path = BASE_DIR / "_tmp_shortcut.vbs"
            vbs_path.write_text(vbs, encoding="utf-8")
            subprocess.run(["cscript", "//nologo", str(vbs_path)], shell=True)
            vbs_path.unlink(missing_ok=True)
            self._log("Collegamento creato sul Desktop!")
        except Exception as e:
            self._log(f"Errore collegamento: {e}")

    def _on_close(self):
        if self.is_running:
            self._stop()
        self.destroy()


if __name__ == "__main__":
    app = App()
    app.mainloop()
