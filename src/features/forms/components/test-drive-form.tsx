import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarDays } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackConversion } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import type { TestDrivePayload, Vehicle } from "@/types";

import { buildFormMeta } from "../lib/form-meta";
import { testDriveFormSchema, type TestDriveFormValues } from "../schemas/test-drive";
import { submitForm } from "../server/submit-form";
import { FormField } from "../fields/form-field";
import { FormSuccess } from "../fields/form-success";

interface TestDriveFormProps {
  vehicle: Vehicle;
  sourcePage?: string;
  onSuccess?: (reference: string) => void;
}

const timeOptions = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function getTodayValue() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

  return local.toISOString().slice(0, 10);
}

export function TestDriveForm({ vehicle, sourcePage = "/", onSuccess }: TestDriveFormProps) {
  const formId = React.useId();
  const today = React.useMemo(getTodayValue, []);
  const [reference, setReference] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const defaultValues = React.useMemo<TestDriveFormValues>(
    () => ({
      fullName: "",
      phone: "",
      email: "",
      preferredDate: today,
      preferredTime: "10:00",
      message: "",
      vehicleSlug: vehicle.slug,
      consent: false,
      website: "",
    }),
    [today, vehicle.slug],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveFormValues>({
    resolver: zodResolver(testDriveFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    const payload: TestDrivePayload = {
      kind: "test-drive",
      vehicleSlug: vehicle.slug,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email || undefined,
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
      message: values.message,
      consent: true,
      meta: buildFormMeta(sourcePage, values.website),
    };

    try {
      const result = await submitForm({ data: payload });

      trackConversion("test_drive_requested", { vehicleSlug: vehicle.slug });
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
        title="Zahtev je poslat"
        message="Javićemo vam se radi potvrde termina probne vožnje. Termin je okviran dok ga ne potvrdimo."
        reference={reference}
        onReset={() => setReference(null)}
        resetLabel="Zakažite drugi termin"
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="flex items-center gap-3 rounded-sm border border-border bg-surface-elevated p-3">
        <img
          src={vehicle.images[0]?.src ?? "/images/vehicles/volkswagen-golf-2019.jpg"}
          alt=""
          width={96}
          height={72}
          className="h-14 w-20 rounded-sm object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {vehicle.brand} {vehicle.model}
          </p>
          <p className="text-xs text-muted-foreground">
            {vehicle.year} · {formatPrice(vehicle.price)}
          </p>
        </div>
      </div>

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
          label="Telefon"
          htmlFor={`${formId}-phone`}
          error={errors.phone?.message}
          required
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

        <div className="grid grid-cols-2 gap-2">
          <FormField
            label="Datum"
            htmlFor={`${formId}-date`}
            error={errors.preferredDate?.message}
            required
          >
            <Input
              id={`${formId}-date`}
              type="date"
              min={today}
              hasError={Boolean(errors.preferredDate)}
              aria-describedby={errors.preferredDate ? `${formId}-date-error` : undefined}
              {...register("preferredDate")}
            />
          </FormField>

          <FormField
            label="Vreme"
            htmlFor={`${formId}-time`}
            error={errors.preferredTime?.message}
            required
          >
            <Select
              id={`${formId}-time`}
              hasError={Boolean(errors.preferredTime)}
              {...register("preferredTime")}
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormField>
        </div>
      </div>

      <FormField
        label="Napomena"
        htmlFor={`${formId}-message`}
        error={errors.message?.message}
        hint="Opciono, npr. željeni dan ili dodatna pitanja."
      >
        <Textarea
          id={`${formId}-message`}
          rows={4}
          maxLength={1000}
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
      <input type="hidden" {...register("vehicleSlug")} />

      <Checkbox
        id={`${formId}-consent`}
        error={errors.consent?.message}
        label="Saglasan/na sam sa obradom ličnih podataka u svrhu zakazivanja probne vožnje."
        {...register("consent")}
      />

      {submitError ? (
        <p role="alert" className="flex items-start gap-2 rounded-sm bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {submitError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" isLoading={isSubmitting} loadingLabel="Šaljem…">
        <CalendarDays aria-hidden="true" />
        Zakažite probnu vožnju
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Termin je okviran i biće potvrđen telefonom.
      </p>
    </form>
  );
}
