"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import {
  EventStatus,
  STATUS_LABEL,
  STATUS_BADGE,
  PaymentStatus,
  PAYMENT_LABEL,
  PAYMENT_BADGE,
  AccountStatus,
  ACCOUNT_LABEL,
  ACCOUNT_BADGE,
} from "@/lib/data";

/** Competition event status chip (Aktif / Belum Dimulai / Ditutup). */
export function EventStatusBadge({ status }: { status: EventStatus }) {
  const T = useTierComponents();
  return <T.Badge variant={STATUS_BADGE[status]}>{STATUS_LABEL[status]}</T.Badge>;
}

/** Registration payment status chip (Belum Bayar / Sudah Bayar / Diverifikasi). */
export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const T = useTierComponents();
  return <T.Badge variant={PAYMENT_BADGE[status]}>{PAYMENT_LABEL[status]}</T.Badge>;
}

/** Account verification status chip (Belum Verifikasi / Dalam Pengecekan / Terverifikasi). */
export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  const T = useTierComponents();
  return <T.Badge variant={ACCOUNT_BADGE[status]}>{ACCOUNT_LABEL[status]}</T.Badge>;
}
