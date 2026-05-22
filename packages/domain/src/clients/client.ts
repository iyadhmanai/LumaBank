import type { EntityId, IsoDateString, IsoDateTimeString } from "../shared/types.js";

export type ClientStatus = "PENDING_KYC" | "ACTIVE" | "SUSPENDED" | "CLOSED";

export type ConsentType =
  | "TERMS_AND_CONDITIONS"
  | "PRIVACY_POLICY"
  | "MARKETING"
  | "INVESTMENT_RISK_DISCLOSURE";

export type Consent = {
  id: EntityId;
  clientId: EntityId;
  type: ConsentType;
  acceptedAt: IsoDateTimeString;
  version: string;
};

export type TaxResidency = {
  countryCode: string;
  taxIdentificationNumber?: string;
};

export type RiskFlagType =
  | "SANCTIONS_MATCH"
  | "PEP"
  | "ADVERSE_MEDIA"
  | "FRAUD_RISK"
  | "MANUAL_REVIEW";

export type RiskFlag = {
  id: EntityId;
  clientId: EntityId;
  type: RiskFlagType;
  reason: string;
  createdAt: IsoDateTimeString;
  resolvedAt?: IsoDateTimeString;
};

export type Client = {
  id: EntityId;
  userId: EntityId;
  firstName: string;
  lastName: string;
  dateOfBirth: IsoDateString;
  countryOfResidence: string;
  taxResidencies: TaxResidency[];
  status: ClientStatus;
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
};
