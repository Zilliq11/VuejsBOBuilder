import i18n from '@/i18n'

export default function (configName) {
  return {
    name: configName,
    label: i18n.t(`sidebar.${configName}.label`),
    url: `/${configName}`,
  }
}
