module.exports = {
  /* 
    Required (Glob files pattern)
    Do not include the entire src directory because vue-i18n-extract doesn't have a way to exclude directories
   */
  vueFiles: './src/{features,global/components,layouts}/**/*.vue',
  languageFiles: './locales/*.json',
  output: false,
  /* With this option activated, the new found translations are added to the lang files,
  otherwise just a report is displayed in the console */
  add: true,
  /* If this is true, the unused translations will be removed,
  however we found that this feature activated doesn't work well when the add feature is also activated,
  therefore, they have opposite values */
  remove: false,
  ci: false,
  /*
  The separator is set to '_' instead of '.', because we are using the original language as the translations keys, 
  therefore a code like $t("aaa. Bbb") would be translated into:
    {
      "aaa": {
        " Bbb": ""
      }
    }

    // Instead we want:
    {
      "aaa. Bbb": ""
    }
  */
  separator: '_',
}
