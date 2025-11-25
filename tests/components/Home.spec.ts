import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { setupI18n } from '@/i18n'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import Home from '@/views/Home.vue'

describe('Home', () => {
  // Avant chaque test, on s'assure que Pinia est "propre"
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const renderComponent = () => {
    return render(Home, {
      global: {
        plugins: [createPinia(), setupI18n()],
      },
    })
  }
  it('affiche le message de bienvenue par défaut', async () => {
    renderComponent()

    expect(page.getByRole('heading', { name: /bienvenue visiteur/i })).toBeVisible()
  })

  it('met à jour le texte quand on change la langue', async () => {
    renderComponent()

    await page.getByRole('button', { name: /changer de langue/i }).click()

    expect(page.getByRole('heading', { name: /welcome visiteur/i })).toBeVisible()
  })

  it("met à jour le message quand le store Pinia change via l'input", async () => {
    renderComponent()

    await page.getByPlaceholder(/tape ton nom/i).fill('Sophie')

    expect(page.getByRole('heading', { name: /bienvenue Sophie/i })).toBeVisible()
  })
})
