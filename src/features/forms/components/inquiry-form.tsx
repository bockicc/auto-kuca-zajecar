import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackConversion } from "@/lib/analytics";
import type { InquiryPayload, InquiryTopic, Vehicle } from "@/types";
import { INQUIRY_TOPIC_LABELS } from "@/types";

import { buildFormMeta } from "../lib/form-meta";
import { inquiryFormSchema, inquiryTopics, type InquiryFormValues } from "../schemas/inquiry";
import { submitForm } from "../server/submit-form";
import { FormField } from "../fields/form-field";
import { FormSuccess } from "../fields/form-success";

interface InquiryFormProps {
  vehicle?: Vehicle;
  sourcePage?: string;
  onSuccess?: (reference: string) => void;
}

const topicOptions = inquiryTopics.map((value) => ({
  value,
  label: INQUIRY_TOPIC_LABELS[value],
}));

export function InquiryForm({ vehicle, sourcePage = "/", onSuccess }: InquiryFormProps) {
  const formId = React.useId();
  const [reference, setReference] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const defaultValues = React.useMemo<InquiryFormValues>(
    () => ({
      fullName: "",
      phone: "",
      email: "",
      topic: vehicle ? "vehicle" : "other",
      vehicleSlug: vehicle?.slug,
      message: "",
      consent: false,
      website: "",
    }),
    [vehicle],
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const message = watch("message") ?? "";

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const payload: InquiryPayload = {
      kind: "inquiry",
      fullName: values.fullName,
      phone: values.phone || undefined,
      email: values.email || undefined,
      topic: values.topic as InquiryTopic,
      vehicleSlug: vehicle?.slug ?? values.vehicleSlug,
      message: values.message,
      consent: true,
      meta: buildFormMeta(sourcePage, values.website),
    };

    try {
      const result = await submitForm({ data: payload });

      trackConversion("inquiry_submitted", {
        topic: payload.topic,
        vehicleSlug: payload.vehicleSlug,
      });
      setReference(result.reference);
      reset(defaultValues);
      onSuccess?.(result.reference);
    } catch {
      setSubmitError(
        "Slanje nije uspelo. Pokušajte ponovo ili nas pozovite na broj iz zaglavlja.",
      );
    }
  });

  if (reference) {
    return (
      <FormSuccess
        title="Upit je poslat"
        message="Hvala na poverenju. Javićemo vam se u najkraćem roku, obično u toku istog radnog dana."
        reference={reference}
        onReset={() => setReference(null)}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {vehicle ? (
        <p className="rounded-sm bg-surface-elevated px-3 py-2 text-sm text-muted-foreground">
          Upit za: <span className="font-medium text-foreground">{vehicle.brand} {vehicle.model}</span>
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Ime i prezime"
          htmlFor={`${formId}-name`}
          error={errors.fullName?.message}
          required
        >
          <Input
            id={`${formId}-name`}
            autoComplete="name"
            hasError={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
            {...register("fullName")}
          />
        </FormField>

        <FormField
          label="Tema"
          htmlFor={`${formId}-topic`}
          error={errors.topic?.message}
          required
        >
          <Select
            id={`${formId}-topic`}
            hasError={Boolean(errors.topic)}
            {...register("topic")}
          >
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField
          label="Telefon"
          htmlFor={`${formId}-phone`}
          error={errors.phone?.message}
          hint="Unesite telefon ili e-poštu."
        >
          <Input
            id={`${formId}-phone`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            hasError={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            {...register("phone")}
          />
        </FormField>

        <FormField label="E-pošta" htmlFor={`${formId}-email`} error={errors.email?.message}>
          <Input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            hasError={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField
        label="Poruka"
        htmlFor={`${formId}-message`}
        error={errors.message?.message}
        hint="Opišite šta vas zanima: model, budžet ili način finansiranja."
        required
      >
        <Textarea
          id={`${formId}-message`}
          rows={5}
          maxLength={1000}
          showCount
          value={message}
          hasError={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          {...register("message")}
        />
      </FormField>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-px opacity-0"
        {...register("website")}
      />

      <Checkbox
        id={`${formId}-consent`}
        error={errors.consent?.message}
        label="Saglasan/na sam sa obradom ličnih podataka u svrhu odgovora na upit."
        {...register("consent")}
      />

      {submitError ? (
        <p role="alert" className="flex items-start gap-2 rounded-sm bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {submitError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" isLoading={isSubmitting} loadingLabel="Šaljem…">
        Pošaljite upit
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Polja označena zvezdicom su obavezna. Vaše podatke koristimo isključivo za odgovor na upit.
      </p>
    </form>
  );
}
