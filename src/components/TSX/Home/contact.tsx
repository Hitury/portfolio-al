import { useId, useState, type FormEvent } from "react";
import SectionHeading from "./section-heading";
import { ArrowRightIcon, CheckIcon, SpinnerIcon } from "./icons";

const FORM_ENDPOINT = "https://formspree.io/f/xkjgrqvy";

type Status = "idle" | "sending" | "sent" | "error";

const fields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your name",
    autoComplete: "name",
    error: "Please enter your name.",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    error: "Please enter a valid email address.",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "What would you like to talk about?",
    multiline: true,
    error: "Please write a message.",
  },
];

const rowClass = "grid gap-2.5 sm:grid-cols-[9rem_1fr] sm:gap-10";

const inputClass =
  "border-line bg-raised/30 text-heading placeholder:text-text/40 caret-amber hover:border-amber/30 focus:border-amber/60 focus:ring-amber/5 aria-invalid:border-red-400/60 aria-invalid:ring-red-400/10 block w-full rounded-xl border border-solid px-4 py-3 outline-none transition-[border-color,box-shadow] duration-250 focus:ring-4";

export default function Contact() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);
  const sending = status === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Validate with our own messages instead of the browser's tooltips.
    const invalidFields = Array.from(form.querySelectorAll<HTMLInputElement>(":invalid"));
    setInvalid(invalidFields.map((field) => field.name));
    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      return;
    }

    setStatus("sending");
    const sent = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    }).then(
      (response) => response.ok,
      () => false, // Network error.
    );
    if (sent) form.reset();
    setStatus(sent ? "sent" : "error");
  }

  // Drop a field's error as soon as it's fixed, and an old status once they type again.
  function handleInput(event: FormEvent<HTMLFormElement>) {
    const field = event.target as HTMLInputElement;
    if (invalid.includes(field.name) && field.validity.valid) {
      setInvalid(invalid.filter((name) => name !== field.name));
    }
    if (status === "sent" || status === "error") setStatus("idle");
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-40 sm:scroll-mt-28 px-5 pt-18 pb-32">
      <SectionHeading index="05" eyebrow="Contact" title="Interested? Contact me here." />

      <div className={rowClass}>
        <p className="text-heading max-w-2xl text-lg leading-relaxed font-light text-balance sm:col-start-2 sm:text-xl">
          Interested in working together, or just want to say hi? Leave a message and I'll get back to you.
        </p>
      </div>

      {/* action/method let the form still post (to Formspree's own page) before React hydrates. */}
      <form
        action={FORM_ENDPOINT}
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        onInput={handleInput}
        className="mt-10 grid gap-6 scheme-dark"
      >
        {fields.map(({ name, label, error, multiline, ...props }) => {
          const fieldId = `${id}-${name}`;
          const errorId = `${fieldId}-error`;
          const hasError = invalid.includes(name);
          const controlProps = {
            ...props,
            id: fieldId,
            name,
            required: true,
            "aria-invalid": hasError,
            "aria-describedby": hasError ? errorId : undefined,
          };

          return (
            <div key={name} className={rowClass}>
              <label
                htmlFor={fieldId}
                className="text-text/55 text-xs font-medium tracking-widest uppercase sm:pt-4.5"
              >
                {label}
              </label>
              <div className="max-w-2xl">
                {multiline ? (
                  <textarea
                    rows={5}
                    maxLength={5000}
                    className={`${inputClass} field-sizing-content max-h-96 min-h-36 resize-none`}
                    {...controlProps}
                  />
                ) : (
                  <input className={inputClass} {...controlProps} />
                )}
                {hasError && (
                  <p id={errorId} className="mt-2 text-sm text-red-300">
                    {error}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Honeypot: hidden from people, but bots fill it in and Formspree drops those submissions. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

        <div className={rowClass}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-start-2">
            <button
              type="submit"
              disabled={sending}
              className="group bg-amber hover:bg-amber/85 inline-flex min-w-44 cursor-pointer select-none items-center justify-center gap-2.5 rounded-3xl border border-solid border-transparent px-6 py-3 font-medium text-[#19120d] transition-all duration-250 active:scale-96 disabled:cursor-wait disabled:opacity-75 max-sm:w-full"
            >
              {sending ? "Sending…" : "Send message"}
              {sending ? (
                <SpinnerIcon className="size-4 motion-safe:animate-spin" />
              ) : (
                <ArrowRightIcon className="size-4 transition-transform duration-250 group-hover:translate-x-0.5" />
              )}
            </button>

            <p role="status" className="text-sm">
              {status === "sent" && (
                <span className="text-amber inline-flex items-center gap-2">
                  <CheckIcon className="size-4" />
                  Thanks! Your message has been sent.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-300">Couldn't send your message. Please try again.</span>
              )}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
