import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

// fonction qui à crée une instance, sert pour les tests pour éviter
//  d'utiliser la même instance pour chaque test (ex : quand on change de langue, on garde la nouvelle langue pour les autres tests)
export const setupI18n = () => {
  return createI18n({
    legacy: false,
    locale: 'fr',
    messages: { fr, en },
  })
}
export const i18n = setupI18n()
