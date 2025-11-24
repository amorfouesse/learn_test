import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { i18n } from '@/i18n'
import Home from '@/views/Home.vue'

describe('Home', () => {
  // Avant chaque test, on s'assure que Pinia est "propre"
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('affiche le message de bienvenue correct par défaut (Pinia + I18n)', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [createPinia(), i18n],
      },
    })

    expect(wrapper.text()).toContain('Bienvenue Visiteur')
  })

  it('met à jour le texte quand on change la langue', async () => {
    const wrapper = mount(Home, {
      global: { plugins: [createPinia(), i18n] },
    })

    // 1. ACTION : On clique sur le bouton (trigger est asynchrone)
    await wrapper.find('[data-test="lang-btn"]').trigger('click')

    // 2. ASSERTION : Le texte doit être passé en anglais
    expect(wrapper.text()).toContain('Welcome Visiteur')
  })

  it("met à jour le message quand le store Pinia change via l'input", async () => {
    const wrapper = mount(Home, {
      global: { plugins: [createPinia(), i18n] },
    })

    const input = wrapper.find('[data-test="name-input"]')

    // 1. ACTION : On simule une écriture dans l'input
    await input.setValue('Sophie')

    // 2. ASSERTION : Le titre doit s'être mis à jour réactivement
    expect(wrapper.find('h1').text()).toBe('Bienvenue Sophie')
  })
})
