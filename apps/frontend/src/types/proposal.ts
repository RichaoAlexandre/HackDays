import type { Decision } from './decision';

export enum ProposalSource {
    HUMAN = 'H',
    MACHINE = 'M',
}

export type Proposal = {
    id?: number;
    decision?: Decision;
    source?: ProposalSource;
    description?: string;
};

export type ProposalFormData = {
    decision_id: number;
    description: string;
    source: ProposalSource;
};