import { instructions, getNonAddressAccountIds } from './challenge';

describe('instructions function', () => {
  it('Task 2: should resolve addresses', () => {
    const expected = {
      admin_init: {
        accounts: [
          { id: 'admin_id', signer: true },
          {
            id: 'program_id',
            address: '5XDdQrpNCD89LtrXDBk5qy4v1BW1zRCPyizTahpxDTcZ',
          },
          {
            id: 'locked_token_mint_id',
            address: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
          },
          {
            id: 'reward_token_mint_id',
            address: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
          },
          {
            id: 'system_program_id',
            address: '11111111111111111111111111111111',
          },
        ],
      },
    };

    const result = instructions({
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
    });

    expect(result).toEqual(expected);
  });

  it('Task 3: should return account ids for accounts without addresses', () => {
    const result = getNonAddressAccountIds({
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
    });

    expect(result).toEqual('admin_id');
  });
});
