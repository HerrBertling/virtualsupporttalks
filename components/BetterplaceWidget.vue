<template>
  <div :class="$style.donationWrapper">
    <script type="text/javascript">
      /* Configure at https://www.betterplace.org/de/projects/91473-redezeit-fuer-dich-wir-hoeren-dir-zu-kostenlos/manage/iframe_donation_form/new */
      var _bp_iframe = _bp_iframe || {}
      _bp_iframe.project_id = 91473 /* REQUIRED */
      _bp_iframe.lang = 'de' /* Language of the form */
      _bp_iframe.width = 600 /* Custom iframe-tag-width, integer */
      _bp_iframe.color =
        '6c9c2e' /* Button and banderole color, hex without "#" */
      _bp_iframe.background_color =
        'ffffff' /* Background-color, hex without "#" */
      _bp_iframe.default_amount = 15 /* Donation-amount, integer 1-99 */
      _bp_iframe.recurring_interval =
        'single' /* Interval for recurring donations, string out of single, monthly und yearly */
      _bp_iframe.bottom_logo = true
      ;(function () {
        var bp = document.createElement('script')
        bp.type = 'text/javascript'
        bp.async = true
        bp.src =
          'https://betterplace-assets.betterplace.org/assets/load_donation_iframe.js'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(bp, s)
      })()
    </script>
    <div
      id="betterplace_donation_iframe"
      style="
        background: transparent
          url('https://www.betterplace.org/assets/new_spinner.gif') 275px 20px
          no-repeat;
      "
    >
      <strong
        ><a
          href="https://www.betterplace.org/de/donate/platform/projects/91473-redezeit-fuer-dich-wir-hoeren-dir-zu-kostenlos"
          >Jetzt Spenden für „REDEZEIT FÜR DICH. Wir hören dir zu. Kostenlos.“
          bei unserem Partner betterplace.org</a
        ></strong
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'BetterplaceWidget',
}
</script>

<style module>
.donationWrapper {
  margin: 0 auto;
  padding: 3rem 0;
  max-width: 600px;
}
</style>
