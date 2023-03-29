import CustomButton from '../components/CustomButton.vue';
import { mount } from "@vue/test-utils";

describe("CustomButton Component", () => {
  it("should render properly", () => {
    const wrapper = mount(CustomButton);
    expect(wrapper).toBeTruthy();
  });
  it("should render prop text", () => {
    const wrapper = mount(CustomButton, {props: {
      labelText: 'Confirmar'
    }});
    // console.log('wrapper', wrapper);
    console.log('wrapper', wrapper.text());
    expect(wrapper.text()).toBe('Confirmar')
  })
})