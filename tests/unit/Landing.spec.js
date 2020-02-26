import {shallowMount} from '@vue/test-utils'

import Landing from '@/views/Landing.vue'

describe('Landing.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Landing)
    expect(wrapper.is(Landing)).toBe(true)
  })
})
