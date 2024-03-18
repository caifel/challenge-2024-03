// TASK 1

type Addresses = {
  staking_program_id: string;
  system_program_id: string;
  locked_token_mint_id: string;
  reward_token_mint_id: string | { address: keyof Addresses };
};

const addresses = (addresses: Addresses) => {
  // Not yet implemented as per requirements
};

addresses({
  staking_program_id: '5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ',
  system_program_id: '11111111111111111111111111111111',
  locked_token_mint_id: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
  reward_token_mint_id: { address: 'locked_token_mint_id' },
});

// TASK 2 (With unit test)

type AccountWithSigner = {
  id: string;
  signer?: true;
};

type AccountWithAddress = {
  id: string;
  address: keyof Addresses;
};

type Instruction = {
  accounts: (AccountWithAddress | AccountWithSigner)[];
};

type Input = {
  addresses: Addresses;
  instructions: {
    [key: string]: Instruction;
  };
};

export const instructions = ({ addresses, instructions }: Input) => {
  Object.entries(instructions).forEach(([key, value]) => {
    instructions[key].accounts = value.accounts.map((account) => {
      if ('address' in account) {
        let address = addresses[account.address];

        while (typeof address !== 'string') {
          address = addresses[address.address];
        }

        return { ...account, address };
      }

      return account;
    });
  });

  return instructions;
};

// Task 3 (With unit test)

const input = {
  addresses: {
    staking_program_id: '5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ',
    locked_token_mint_id: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
    reward_token_mint_id: { address: 'locked_token_mint_id' },
    system_program_id: '11111111111111111111111111111111',
  },
  instructions: {
    admin_init: {
      accounts: [
        { id: 'admin_id', signer: true },
        { id: 'program_id', address: 'staking_program_id' },
        { id: 'locked_token_mint_id', address: 'locked_token_mint_id' },
        { id: 'reward_token_mint_id', address: 'reward_token_mint_id' },
        { id: 'system_program_id', address: 'system_program_id' },
      ],
    },
  },
};

export const getNonAddressAccountIds = (inputs: typeof input) => {
  const ids = inputs.instructions.admin_init.accounts
    .filter((account) => !account.address)
    .map((account) => account.id);

  return ids.length > 1 ? ids : ids[0];
};
