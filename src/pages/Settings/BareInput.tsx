import { useState, useEffect } from "preact/hooks";
import { set } from "../../util/IDB";
import { uninstallServiceWorkers } from "../../util/SWHelper";
import { useTranslation } from "react-i18next";

interface BareInputProps {
  placeholder: string;
  storageKey: string;
}

function BareInput(props: BareInputProps) {
  const { t } = useTranslation();
  const value = localStorage.getItem(props.storageKey) || "/bare/";
  const [inputValue, setInputValue] = useState(value);
  function validateUrl(url: string) {
    let finalUrl = url;
    if (url === "/bare/" || url === "/bare") {
      finalUrl = "/bare/";
      return finalUrl;
    }
    if (url === null || url === undefined || url === "") {
      finalUrl = "/bare/";
      return finalUrl;
    }
    if (!url.endsWith("/")) {
      finalUrl = url + "/";
    }
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    return finalUrl;
  }
  function handleChange() {
    const url = validateUrl(
      (document.getElementById("input") as HTMLInputElement).value
    );
    setInputValue((document.getElementById("input") as HTMLInputElement).value);
    set(props.storageKey, url);
    localStorage.setItem(props.storageKey, url);
    uninstallServiceWorkers();
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder={props.placeholder}
        value={inputValue}
        id="input"
        className="font-roboto flex h-14 w-56 text-input-text flex-row rounded-2xl border border-input-border-color bg-input p-4 text-center text-xl"
      />
      <div
        className="font-roboto flex h-4 w-24 space-y-0.5 flex-row items-center text-input-text justify-center rounded-2xl border border-input-border-color bg-input p-4 text-center text-xl"
        onClick={handleChange}
      >
        {t("settings.bare.select")}
      </div>
    </div>
  );
}

export default BareInput;
