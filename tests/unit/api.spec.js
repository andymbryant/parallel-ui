import { shallowMount } from '@vue/test-utils'
import APIService from '@/api.js'

const api = new APIService()

it('gets player model', async () => {
  expect.assertions(1);
  const data = await api.getPlayerModel('Bobcat');
  expect(data).toEqual('The model for player Bobcat is abcd.');
});

it('throws error on getPlayerModel with no player arg', async () => {
  expect.assertions(1);
  let thrown;
  try {
    await api.getPlayerModel()
  }
  catch(error) {
    thrown = error
  }

  const response = new Error('Please include a player.')
  expect(thrown).toEqual(response);
});
