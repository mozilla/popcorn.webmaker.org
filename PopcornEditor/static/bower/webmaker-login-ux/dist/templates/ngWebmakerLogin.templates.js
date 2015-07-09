angular.module('templates-ngWebmakerLogin', ['join-webmaker-modal.html', 'modal-wrapper.html', 'reset-modal.html', 'signin-modal.html']);

angular.module("join-webmaker-modal.html", []).run(["$templateCache", function($templateCache) {
 $templateCache.put("join-webmaker-modal.html",
  "<div class=\"modal-header\">\n" +
  "  <button ng-click=\"close()\" ng-hide=\"\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
  "  <h3 class=\"modal-title\" ng-hide=\"currentState === MODALSTATE.welcome\">\n" +
  "    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n" +
  "    <span class=\"modal-title-center\">{{ 'webmakerAuthCreateWelcome' | i18n }}</span>\n" +
  "    <button\n" +
  "      ng-show=\"currentState === MODALSTATE.inputEmail\"\n" +
  "      href=\"#\" ng-click=\"submitEmail()\" ng-disabled=\"!user.email || form.user.$error.accountExists || form.user.$error.invalidEmail\" tabindex=\"3\" class=\"btn-link modal-title-right\">{{ 'Next' | i18n }}</button>\n" +
  "    <button\n" +
  "      ng-show=\"currentState === MODALSTATE.inputUsername\"\n" +
  "      ng-disabled=\"!user.username || form.user.$error.invalidUsername || form.user.$error.usernameTaken || sendingRequest\" ng-click=\"submitUser()\" class=\"btn-link create-user modal-title-right\" tabindex=\"5\">{{ 'Sign up' | i18n }}</button>\n" +
  "  </h3>\n" +
  "  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.welcome\">\n" +
  "    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n" +
  "    <span>{{ 'webmakerAuthWelcome' | i18n }}</span>\n" +
  "    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-right\">{{ 'Done' | i18n }}</a>\n" +
  "  </h3>\n" +
  "</div>\n" +
  "<div class=\"modal-body\">\n" +
  "  <form class=\"form\" name=\"form.user\" novalidate>\n" +
  "    <div ng-show=\"currentState === MODALSTATE.inputEmail\">\n" +
  "      <div class=\"form-group\">\n" +
  "        <label for=\"webmaker-login-email\">{{ 'Email' | i18n }}</label>\n" +
  "        <input id=\"webmaker-login-email\" ng-model=\"user.email\" ng-keyup=\"validateEmail();\" type=\"text\" class=\"form-control\" name=\"email\" autocomplete=\"off\" autofocus tabindex=\"1\" required focus-on=\"create-user-email\">\n" +
  "      </div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.agreeToTerms\" ng-bind-html=\"'webmakerAuthAgreeError' | i18n\"></div>\n" +
  "      <div class=\"alert alert-warning\" ng-show=\"form.user.$error.accountExists\" bind-trusted-html=\"'WebmakerAccountExists' | i18n\"></div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidEmail\" ng-bind-html=\"'NotAnEmail' | i18n\"></div>\n" +
  "      <div class=\"terms-checkbox checkbox\">\n" +
  "        <input id=\"agree-to-terms\" ng-model=\"user.agree\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" ng-change=\"agreeToTermsChanged();\" name=\"agree\" tabindex=\"2\">\n" +
  "        <label for=\"agree-to-terms\" tabindex=\"2\">\n" +
  "          <div><span></span></div>\n" +
  "          <span ng-bind-html=\"'webmakerAuthAgreeToTerms' | i18n\"></span>\n" +
  "        </label>\n" +
  "      </div>\n" +
  "      <div class=\"mailing-list-checkbox checkbox\">\n" +
  "        <input id=\"subscribe-to-list\" ng-model=\"user.subscribeToList\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" name=\"subscribeToList\" tabindex=\"2\">\n" +
  "        <label for=\"subscribe-to-list\" tabindex=\"2\">\n" +
  "          <div><span></span></div>\n" +
  "          <span ng-bind-html=\"'webmakerAuthMailingList' | i18n\"></span>\n" +
  "        </label>\n" +
  "      </div>\n" +
  "      <div class=\"cta-links clearfix\">\n" +
  "        <button ng-click=\"submitEmail()\" ng-disabled=\"!user.email || form.user.$error.accountExists || form.user.$error.invalidEmail\" class=\"create-user btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"3\">{{ 'Sign up' | i18n }}</button>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "\n" +
  "    <div ng-show=\"currentState === MODALSTATE.inputUsername\">\n" +
  "      <div class=\"form-group\">\n" +
  "        <label for=\"pre-username\">{{ 'webmakerAuthChooseUsername' | i18n }}</label>\n" +
  "        <label for=\"username\" class=\"hidden-xs-login\">webmaker.org/user/</label>\n" +
  "        <input ng-model=\"user.username\" name=\"username\" ng-change=\"validateUsername()\" class=\"form-control username\" autocomplete=\"off\" required autofocus tabindex=\"4\" focus-on=\"create-user-username\" maxlength=\"20\" minlength=\"1\">\n" +
  "        <div class=\"visible-xs help-block text-center\">webmaker.org/user/<strong class=\"username-with-url\">{{user.username}}</strong></div>\n" +
  "      </div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidUsername\" ng-bind-html=\"'webmakerAuthUsernameInvalid' | i18n\"></div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.serverError\" ng-bind-html=\"'webmakerAuthServerError' | i18n\"></div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.usernameTaken\" ng-bind-html=\"'webmakerAuthTakenError' | i18n\"></div>\n" +
  "      <div ng-show=\"skippedEmail\" class=\"mailing-list-checkbox checkbox\">\n" +
  "        <input id=\"subscribe-to-list\" ng-model=\"user.subscribeToList\" type=\"checkbox\" ng-disabled=\"form.user.$error.accountExists\" name=\"subscribeToList\" tabindex=\"2\">\n" +
  "        <label for=\"subscribe-to-list\" tabindex=\"2\">\n" +
  "          <div><span></span></div>\n" +
  "          <span ng-bind-html=\"'webmakerAuthMailingList' | i18n\"></span>\n" +
  "        </label>\n" +
  "      </div>\n" +
  "      <button ng-disabled=\"!user.username || form.user.$error.invalidUsername || form.user.$error.usernameTaken || sendingRequest\" ng-click=\"submitUser()\" class=\"create-user btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"5\">{{ 'webmakerAuthCreateAccount' | i18n }}</button>\n" +
  "    </div>\n" +
  "\n" +
  "    <div ng-show=\"currentState === MODALSTATE.welcome\" class=\"welcome\">\n" +
  "      <p class=\"subheadline\">{{ 'aboutWebmaker' | i18n }}</p>\n" +
  "\n" +
  "        <!-- Goggles -->\n" +
  "        <div class=\"tool-desc\" ng-show=\"welcomeModalIdx === 0\">\n" +
  "          <div class=\"icon\">\n" +
  "            <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
  "            <svg width=\"276px\" height=\"210px\" viewBox=\"0 0 276 210\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n" +
  "              <title>Goggles</title>\n" +
  "              <desc>XRay Goggles.</desc>\n" +
  "              <defs></defs>\n" +
  "              <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
  "                <g id=\"Artboard-27\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-8.000000, -25.000000)\">\n" +
  "                  <g id=\"goggles\" sketch:type=\"MSLayerGroup\" transform=\"translate(8.000000, 25.000000)\">\n" +
  "                    <path d=\"M256.460878,100.757257 C254.300432,98.595 248.740338,93.6349115 244.461405,91.3416372 L87.2010811,2.31836283 C82.0372703,-0.216504425 74.6962297,-1.41238938 69.0606081,4.21300885 C63.4091351,9.83747788 64.2679054,16.7711947 66.8740541,21.7935398 L156.207608,178.545531 C158.362459,181.89531 163.757514,188.816947 165.933811,190.960619 C190.938851,215.872566 231.455838,215.88 256.460878,190.960619 C281.469649,166.057965 281.469649,125.658982 256.460878,100.757257\" id=\"Fill-1\" fill=\"#ECA5C0\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M206.411635,4.22137168 C200.776946,-1.41238938 193.033095,-0.216504425 188.474432,2.21336283 L32.3423514,90.5518142 C27.5645676,93.5884513 21.1746081,98.595 19.0113649,100.757257 C-5.99367568,125.658982 -5.99367568,166.057965 19.0113649,190.960619 C44.015473,215.872566 84.5389865,215.872566 109.525378,190.960619 C111.700743,188.816947 116.493446,182.464912 118.293041,180.08708 L208.316595,22.2302655 C211.235108,17.7031858 212.050986,9.83747788 206.411635,4.22137168\" id=\"Fill-2\" fill=\"#59B3D7\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M137.699757,146.04292 L187.347122,58.9867699 L137.736122,30.9025221 L88.0896892,58.9923451 L137.699757,146.04292\" id=\"Fill-3\" fill=\"#4E72A7\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M19.0113649,190.960619 C-5.99367568,166.057965 -5.99367568,125.658982 19.0113649,100.757257 C44.015473,75.8360177 84.5389865,75.8360177 109.525378,100.757257 C134.526689,125.658982 134.526689,166.057965 109.525378,190.960619 C84.5389865,215.872566 44.015473,215.872566 19.0113649,190.960619\" id=\"Fill-4\" fill=\"#369ECD\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M256.526149,190.960619 C231.520176,215.88 191.001324,215.872566 165.995351,190.960619 C140.994041,166.057965 140.994041,125.667345 165.995351,100.747965 C191.001324,75.8360177 231.520176,75.8360177 256.526149,100.757257 C281.532122,125.658982 281.532122,166.057965 256.526149,190.960619\" id=\"Fill-5\" fill=\"#E36D9E\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M235.671365,172.371903 C222.429892,185.550796 200.976486,185.550796 187.746203,172.371903 C174.501,159.16885 174.501,137.799027 187.746203,124.595044 C200.976486,111.409646 222.429892,111.409646 235.671365,124.612699 C248.903514,137.799027 248.903514,159.16885 235.671365,172.371903\" id=\"Fill-6\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M211.686405,130.685973 C197.874284,130.685973 186.669243,142.526814 186.669243,147.321504 C186.669243,148.542478 187.402135,149.697478 188.704743,150.735398 C189.952338,148.202389 191.521622,145.792035 193.651297,143.673451 C195.952541,141.379248 198.579203,139.622124 201.369041,138.337035 C195.774446,143.999602 195.790297,153.095575 201.451095,158.720973 C207.112824,164.37146 216.304743,164.37146 221.987919,158.720973 C227.658041,153.061195 227.658041,143.897389 221.987919,138.246903 C221.513311,137.773938 220.980892,137.392035 220.455,137.00177 C224.543716,138.231106 228.400257,140.452832 231.635797,143.673451 C233.390635,145.410133 234.738,147.370752 235.893284,149.405708 C236.381878,148.741327 236.7045,148.044425 236.7045,147.321504 C236.7045,142.526814 225.511581,130.685973 211.686405,130.685973 L211.686405,130.685973 Z M220.613514,144.661195 C220.613514,146.779779 218.886649,148.491372 216.75977,148.491372 C214.626365,148.491372 212.908824,146.779779 212.908824,144.661195 C212.908824,142.542611 214.626365,140.822655 216.75977,140.822655 C218.886649,140.822655 220.613514,142.542611 220.613514,144.661195 L220.613514,144.661195 Z\" id=\"Fill-7\" fill=\"#E36D9E\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M86.2761081,172.371903 C73.0467568,185.550796 51.5765676,185.550796 38.3490811,172.371903 C25.1048108,159.16885 25.1048108,137.799027 38.3490811,124.595044 C51.5765676,111.409646 73.0467568,111.409646 86.2761081,124.612699 C99.5073243,137.799027 99.5073243,159.16885 86.2761081,172.371903\" id=\"Fill-8\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M62.3051351,130.685973 C48.479027,130.685973 37.2861081,142.526814 37.2861081,147.321504 C37.2861081,148.542478 38.0031486,149.697478 39.2871081,150.735398 C40.5552162,148.202389 42.1384865,145.792035 44.2373919,143.673451 C46.5367703,141.38854 49.1615676,139.630487 51.9476757,138.347257 C46.3754595,144.014469 46.3978378,153.095575 52.0334595,158.720973 C57.7026486,164.37146 66.9085541,164.37146 72.5768108,158.720973 C78.2599865,153.061195 78.2599865,143.897389 72.5768108,138.246903 C72.0938108,137.765575 71.553,137.383673 71.0233784,136.984115 C75.134473,138.214381 79.0087297,140.440752 82.254527,143.673451 C83.9897838,145.410133 85.3362162,147.370752 86.5138784,149.405708 C86.981027,148.741327 87.3111081,148.044425 87.3111081,147.321504 C87.3111081,142.526814 76.1107297,130.685973 62.3051351,130.685973 L62.3051351,130.685973 Z M71.2163919,144.661195 C71.2163919,146.779779 69.4913919,148.491372 67.3645135,148.491372 C65.2478919,148.491372 63.5089054,146.779779 63.5089054,144.661195 C63.5089054,142.542611 65.2478919,140.822655 67.3645135,140.822655 C69.4913919,140.822655 71.2163919,142.542611 71.2163919,144.661195 L71.2163919,144.661195 Z\" id=\"Fill-9\" fill=\"#369ECD\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                  </g>\n" +
  "                </g>\n" +
  "              </g>\n" +
  "            </svg>\n" +
  "          </div>\n" +
  "          <h4>{{ 'XRay-Goggles' | i18n }}</h4>\n" +
  "          <p>{{ 'AboutGoggles' | i18n }}</p>\n" +
  "          <div class=\"clearfix\">\n" +
  "            <a class=\"create-user btn btn-primary\" type=\"button\" href=\"https://goggles.webmaker.org\" autofocus>{{'TryGoggles' | i18n }}</a>\n" +
  "            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "\n" +
  "        <!-- Resources -->\n" +
  "        <div class=\"tool-desc\" ng-show=\"welcomeModalIdx === 1\">\n" +
  "          <div class=\"icon\">\n" +
  "            <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
  "            <svg width=\"269px\" height=\"212px\" viewBox=\"0 0 269 212\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n" +
  "                <title>Webmaker Resources</title>\n" +
  "                <desc></desc>\n" +
  "                <defs></defs>\n" +
  "                <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
  "                  <g id=\"resources-illustration\" sketch:type=\"MSLayerGroup\" transform=\"translate(1.000000, 1.000000)\">\n" +
  "                      <path d=\"M156.358,204.482 C156.358,208.067 153.453,210.974 149.867,210.974 L6.357,210.974 C2.773,210.974 -0.133,208.067 -0.133,204.482 L-0.133,27.567 C-0.133,23.981 2.773,21.074 6.357,21.074 L149.867,21.074 C153.453,21.074 156.358,23.981 156.358,27.567 L156.358,204.482\" id=\"Fill-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M3,45.473 L152,45.473 L152,91.473 L3,91.473 L3,45.473 Z\" id=\"Fill-2\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M4,24.473 L154,24.473 L154,45.473 L4,45.473 L4,24.473 Z\" id=\"Fill-3\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M6.021,30.993 C6.021,29.197 7.477,27.741 9.273,27.741 C11.068,27.741 12.523,29.197 12.523,30.993 C12.523,32.789 11.068,34.244 9.273,34.244 C7.477,34.244 6.021,32.789 6.021,30.993\" id=\"Fill-4\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M14.395,30.993 C14.395,29.197 15.852,27.741 17.647,27.741 C19.443,27.741 20.898,29.197 20.898,30.993 C20.898,32.789 19.443,34.244 17.647,34.244 C15.852,34.244 14.395,32.789 14.395,30.993\" id=\"Fill-5\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M22.769,30.993 C22.769,29.197 24.225,27.741 26.02,27.741 C27.816,27.741 29.272,29.197 29.272,30.993 C29.272,32.789 27.816,34.244 26.02,34.244 C24.225,34.244 22.769,32.789 22.769,30.993\" id=\"Fill-6\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M49.98,118.367 L137.896,118.367 M49.98,133.901 L137.896,133.901\" id=\"Stroke-7\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M22.239,115.145 C22.239,111.583 25.125,108.697 28.687,108.697 C32.248,108.697 35.133,111.583 35.133,115.145 C35.133,118.706 32.248,121.592 28.687,121.592 C25.125,121.592 22.239,118.706 22.239,115.145\" id=\"Fill-8\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M28.687,131.554 C25.125,131.554 22.239,134.44 22.239,138.001 C22.239,141.563 25.125,144.449 28.687,144.449 C32.248,144.449 35.133,141.563 35.133,138.001 C35.133,134.44 32.248,131.554 28.687,131.554 L28.687,131.554 Z M28.687,133.313 C31.271,133.313 33.375,135.415 33.375,138.001 C33.375,140.587 31.271,142.691 28.687,142.691 C26.101,142.691 23.998,140.587 23.998,138.001 C23.998,135.415 26.101,133.313 28.687,133.313 L28.687,133.313 Z\" id=\"Fill-9\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M28.685,132.472 L28.685,118.076\" id=\"Stroke-10\" stroke=\"#739AB1\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M49.98,162.908 L137.896,162.908 M49.98,178.442 L137.896,178.442\" id=\"Stroke-11\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M22.239,159.685 C22.239,156.124 25.125,153.238 28.687,153.238 C32.248,153.238 35.133,156.124 35.133,159.685 C35.133,163.246 32.248,166.133 28.687,166.133 C25.125,166.133 22.239,163.246 22.239,159.685\" id=\"Fill-13\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M28.687,176.094 C25.125,176.094 22.239,178.981 22.239,182.542 C22.239,186.103 25.125,188.989 28.687,188.989 C32.248,188.989 35.133,186.103 35.133,182.542 C35.133,178.981 32.248,176.094 28.687,176.094 L28.687,176.094 Z M28.687,177.853 C31.271,177.853 33.375,179.956 33.375,182.542 C33.375,185.128 31.271,187.231 28.687,187.231 C26.101,187.231 23.998,185.128 23.998,182.542 C23.998,179.956 26.101,177.853 28.687,177.853 L28.687,177.853 Z\" id=\"Fill-14\" fill=\"#739AB1\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M28.685,177.013 L28.685,162.616\" id=\"Stroke-15\" stroke=\"#739AB1\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M150.202,32.43 C150.202,34.696 148.365,36.533 146.101,36.533 L64.628,36.533 C62.363,36.533 60.526,34.696 60.526,32.43 L60.526,31.844 C60.526,29.579 62.363,27.741 64.628,27.741 L146.101,27.741 C148.365,27.741 150.202,29.579 150.202,31.844 L150.202,32.43\" id=\"Fill-16\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M149.867,21.074 L6.357,21.074 C2.773,21.074 -0.133,23.981 -0.133,27.567 L-0.133,204.482 C-0.133,208.067 2.773,210.974 6.357,210.974 L149.867,210.974 C153.453,210.974 156.358,208.067 156.358,204.482 L156.358,27.567 C156.358,23.981 153.453,21.074 149.867,21.074 L149.867,21.074 Z M149.867,26.349 C150.538,26.349 151.083,26.895 151.083,27.567 L151.083,204.482 C151.083,205.153 150.538,205.698 149.867,205.698 L6.357,205.698 C5.687,205.698 5.142,205.153 5.142,204.482 L5.142,27.567 C5.142,26.895 5.687,26.349 6.357,26.349 L149.867,26.349 L149.867,26.349 Z\" id=\"Fill-17\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M212.625,183.381 C212.625,186.967 209.72,189.874 206.135,189.874 L62.624,189.874 C59.04,189.874 56.133,186.967 56.133,183.381 L56.133,6.466 C56.133,2.881 59.04,-0.026 62.624,-0.026 L206.135,-0.026 C209.72,-0.026 212.625,2.881 212.625,6.466 L212.625,183.381\" id=\"Fill-18\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M59,24.473 L208,24.473 L208,70.473 L59,70.473 L59,24.473 Z\" id=\"Fill-19\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M61,3.473 L210,3.473 L210,24.473 L61,24.473 L61,3.473 Z\" id=\"Fill-20\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M62.288,9.893 C62.288,8.098 63.744,6.641 65.54,6.641 C67.335,6.641 68.79,8.098 68.79,9.893 C68.79,11.689 67.335,13.144 65.54,13.144 C63.744,13.144 62.288,11.689 62.288,9.893\" id=\"Fill-21\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M70.662,9.893 C70.662,8.098 72.118,6.641 73.914,6.641 C75.709,6.641 77.165,8.098 77.165,9.893 C77.165,11.689 75.709,13.144 73.914,13.144 C72.118,13.144 70.662,11.689 70.662,9.893\" id=\"Fill-22\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M79.036,9.893 C79.036,8.098 80.492,6.641 82.287,6.641 C84.083,6.641 85.539,8.098 85.539,9.893 C85.539,11.689 84.083,13.144 82.287,13.144 C80.492,13.144 79.036,11.689 79.036,9.893\" id=\"Fill-23\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M106.246,97.268 L194.162,97.268 M106.246,112.801 L194.162,112.801\" id=\"Stroke-24\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M78.506,94.045 C78.506,90.484 81.392,87.598 84.954,87.598 C88.515,87.598 91.399,90.484 91.399,94.045 C91.399,97.606 88.515,100.492 84.954,100.492 C81.392,100.492 78.506,97.606 78.506,94.045\" id=\"Fill-25\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M84.954,110.453 C81.392,110.453 78.506,113.34 78.506,116.902 C78.506,120.463 81.392,123.349 84.954,123.349 C88.515,123.349 91.399,120.463 91.399,116.902 C91.399,113.34 88.515,110.453 84.954,110.453 L84.954,110.453 Z M84.954,112.212 C87.538,112.212 89.641,114.316 89.641,116.902 C89.641,119.488 87.538,121.59 84.954,121.59 C82.368,121.59 80.264,119.488 80.264,116.902 C80.264,114.316 82.368,112.212 84.954,112.212 L84.954,112.212 Z\" id=\"Fill-26\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M84.952,111.372 L84.952,96.976\" id=\"Stroke-27\" stroke=\"#FF6969\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M106.246,141.808 L194.162,141.808 M106.246,157.341 L194.162,157.341\" id=\"Stroke-28\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M78.506,138.585 C78.506,135.024 81.392,132.137 84.954,132.137 C88.515,132.137 91.399,135.024 91.399,138.585 C91.399,142.147 88.515,145.033 84.954,145.033 C81.392,145.033 78.506,142.147 78.506,138.585\" id=\"Fill-29\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M84.954,154.994 C81.392,154.994 78.506,157.88 78.506,161.442 C78.506,165.003 81.392,167.89 84.954,167.89 C88.515,167.89 91.399,165.003 91.399,161.442 C91.399,157.88 88.515,154.994 84.954,154.994 L84.954,154.994 Z M84.954,156.753 C87.538,156.753 89.641,158.856 89.641,161.442 C89.641,164.028 87.538,166.131 84.954,166.131 C82.368,166.131 80.264,164.028 80.264,161.442 C80.264,158.856 82.368,156.753 84.954,156.753 L84.954,156.753 Z\" id=\"Fill-30\" fill=\"#FF6969\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M84.952,155.912 L84.952,141.516\" id=\"Stroke-31\" stroke=\"#FF6969\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M206.469,11.33 C206.469,13.596 204.632,15.433 202.367,15.433 L120.895,15.433 C118.63,15.433 116.792,13.596 116.792,11.33 L116.792,10.744 C116.792,8.479 118.63,6.641 120.895,6.641 L202.367,6.641 C204.632,6.641 206.469,8.479 206.469,10.744 L206.469,11.33\" id=\"Fill-32\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M206.135,-0.026 L62.624,-0.026 C59.04,-0.026 56.133,2.881 56.133,6.466 L56.133,183.381 C56.133,186.967 59.04,189.874 62.624,189.874 L206.135,189.874 C209.72,189.874 212.625,186.967 212.625,183.381 L212.625,6.466 C212.625,2.881 209.72,-0.026 206.135,-0.026 L206.135,-0.026 Z M206.135,5.249 C206.805,5.249 207.35,5.795 207.35,6.466 L207.35,183.381 C207.35,184.053 206.805,184.599 206.135,184.599 L62.624,184.599 C61.954,184.599 61.408,184.053 61.408,183.381 L61.408,6.466 C61.408,5.795 61.954,5.249 62.624,5.249 L206.135,5.249 L206.135,5.249 Z\" id=\"Fill-33\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M267.134,204.482 C267.134,208.067 264.229,210.974 260.643,210.974 L117.132,210.974 C113.548,210.974 110.642,208.067 110.642,204.482 L110.642,27.567 C110.642,23.981 113.548,21.074 117.132,21.074 L260.643,21.074 C264.229,21.074 267.134,23.981 267.134,27.567 L267.134,204.482\" id=\"Fill-34\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M113,45.473 L263,45.473 L263,91.473 L113,91.473 L113,45.473 Z\" id=\"Fill-35\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M115,24.473 L264,24.473 L264,45.473 L115,45.473 L115,24.473 Z\" id=\"Fill-36\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M116.796,30.993 C116.796,29.197 118.252,27.741 120.048,27.741 C121.843,27.741 123.299,29.197 123.299,30.993 C123.299,32.789 121.843,34.244 120.048,34.244 C118.252,34.244 116.796,32.789 116.796,30.993\" id=\"Fill-37\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M125.17,30.993 C125.17,29.197 126.626,27.741 128.422,27.741 C130.218,27.741 131.673,29.197 131.673,30.993 C131.673,32.789 130.218,34.244 128.422,34.244 C126.626,34.244 125.17,32.789 125.17,30.993\" id=\"Fill-38\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M133.544,30.993 C133.544,29.197 135,27.741 136.795,27.741 C138.592,27.741 140.048,29.197 140.048,30.993 C140.048,32.789 138.592,34.244 136.795,34.244 C135,34.244 133.544,32.789 133.544,30.993\" id=\"Fill-39\" fill=\"#C4C4C4\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M160.754,118.367 L248.671,118.367 M160.754,133.901 L248.671,133.901\" id=\"Stroke-40\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M133.014,115.145 C133.014,111.583 135.9,108.697 139.462,108.697 C143.023,108.697 145.908,111.583 145.908,115.145 C145.908,118.706 143.023,121.592 139.462,121.592 C135.9,121.592 133.014,118.706 133.014,115.145\" id=\"Fill-41\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M139.462,131.554 C135.9,131.554 133.014,134.44 133.014,138.001 C133.014,141.563 135.9,144.449 139.462,144.449 C143.023,144.449 145.908,141.563 145.908,138.001 C145.908,134.44 143.023,131.554 139.462,131.554 L139.462,131.554 Z M139.462,133.313 C142.047,133.313 144.149,135.415 144.149,138.001 C144.149,140.587 142.047,142.691 139.462,142.691 C136.876,142.691 134.772,140.587 134.772,138.001 C134.772,135.415 136.876,133.313 139.462,133.313 L139.462,133.313 Z\" id=\"Fill-42\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M139.46,132.472 L139.46,118.076\" id=\"Stroke-43\" stroke=\"#00CEB8\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M160.754,162.908 L248.671,162.908 M160.754,178.442 L248.671,178.442\" id=\"Stroke-44\" stroke=\"#D6D6D6\" stroke-width=\"7.033\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M133.014,159.685 C133.014,156.124 135.9,153.238 139.462,153.238 C143.023,153.238 145.908,156.124 145.908,159.685 C145.908,163.246 143.023,166.133 139.462,166.133 C135.9,166.133 133.014,163.246 133.014,159.685\" id=\"Fill-46\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M139.462,176.094 C135.9,176.094 133.014,178.981 133.014,182.542 C133.014,186.103 135.9,188.989 139.462,188.989 C143.023,188.989 145.908,186.103 145.908,182.542 C145.908,178.981 143.023,176.094 139.462,176.094 L139.462,176.094 Z M139.462,177.853 C142.047,177.853 144.149,179.956 144.149,182.542 C144.149,185.128 142.047,187.231 139.462,187.231 C136.876,187.231 134.772,185.128 134.772,182.542 C134.772,179.956 136.876,177.853 139.462,177.853 L139.462,177.853 Z\" id=\"Fill-47\" fill=\"#00CEB8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M139.46,177.013 L139.46,162.616\" id=\"Stroke-48\" stroke=\"#00CEB8\" stroke-width=\"2.638\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M260.978,32.43 C260.978,34.696 259.141,36.533 256.875,36.533 L175.403,36.533 C173.138,36.533 171.301,34.696 171.301,32.43 L171.301,31.844 C171.301,29.579 173.138,27.741 175.403,27.741 L256.875,27.741 C259.141,27.741 260.978,29.579 260.978,31.844 L260.978,32.43\" id=\"Fill-49\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      <path d=\"M260.643,21.074 L117.132,21.074 C113.548,21.074 110.642,23.981 110.642,27.567 L110.642,204.482 C110.642,208.067 113.548,210.974 117.132,210.974 L260.643,210.974 C264.229,210.974 267.134,208.067 267.134,204.482 L267.134,27.567 C267.134,23.981 264.229,21.074 260.643,21.074 L260.643,21.074 Z M260.643,26.349 C261.313,26.349 261.858,26.895 261.858,27.567 L261.858,204.482 C261.858,205.153 261.313,205.698 260.643,205.698 L117.132,205.698 C116.462,205.698 115.917,205.153 115.917,204.482 L115.917,27.567 C115.917,26.895 116.462,26.349 117.132,26.349 L260.643,26.349 L260.643,26.349 Z\" id=\"Fill-50\" fill=\"#D6D6D6\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                  </g>\n" +
  "                </g>\n" +
  "            </svg>\n" +
  "          </div>\n" +
  "          <h4>{{ 'Resources' | i18n }}</h4>\n" +
  "          <p>{{ 'AboutResources' | i18n }}</p>\n" +
  "          <div class=\"clearfix\">\n" +
  "            <a class=\"create-user btn btn-primary\" type=\"button\" href=\"https://webmaker.org/resources\" autofocus>{{'VisitResources' | i18n }}</a>\n" +
  "            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "\n" +
  "        <!-- simplified CTA -->\n" +
  "        <div class=\"tool-desc\" ng-show=\"simpleCTA\">\n" +
  "          <div class=\"clearfix\">\n" +
  "            <button class=\"create-user btn btn-primary\" type=\"button\" href=\"#\" ng-click=\"close()\">{{ 'Lets Go!' | i18n }}</button>\n" +
  "            <a href=\"https://webmaker.org/explore\" class=\"explore-link\">{{ 'ExploreWebmaker' | i18n }}</a>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "    </div>\n" +
  "  </form>\n" +
  "</div>\n" +
  "");
}]);

angular.module("modal-wrapper.html", []).run(["$templateCache", function($templateCache) {
 $templateCache.put("modal-wrapper.html",
  "<div class=\"modal-backdrop fade in\"></div>\n" +
  "<div class=\"modal fade in\" style=\"display: block\">\n" +
  "  <div class=\"modal-dialog\">\n" +
  "    <div class=\"modal-content\"></div>\n" +
  "  </div>\n" +
  "</div>\n" +
  "");
}]);

angular.module("reset-modal.html", []).run(["$templateCache", function($templateCache) {
 $templateCache.put("reset-modal.html",
  "<div class=\"modal-header\">\n" +
  "  <button ng-click=\"close()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
  "  <h3 class=\"modal-title\">\n" +
  "    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n" +
  "    <span class=\"modal-title-center\">{{ 'Reset Password' | i18n }}</span>\n" +
  "    <button ng-click=\"submitResetRequest()\" ng-disabled=\"sendingRequest || !password.value || !password.confirmValue || !passwordsMatch || form.password.$error.passwordsMustMatch\" class=\"modal-title-right btn-link\" type=\"button\" tabindex=\"3\">{{ 'Submit' | i18n }}</button>\n" +
  "  </h3>\n" +
  "</div>\n" +
  "<div class=\"modal-body clearfix\">\n" +
  "  <form class=\"form\" name=\"form.password\" novalidate>\n" +
  "\n" +
  "    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.passwordsMustMatch\" ng-bind-html=\"'passwords do not match' | i18n\"></div>\n" +
  "    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.weakPassword\" ng-bind-html=\"'Password too weak' | i18n\"></div>\n" +
  "    <div class=\"alert alert-danger\" ng-show=\"form.password.$error.serverError\" ng-bind-html=\"'error setting password' | i18n\"></div>\n" +
  "\n" +
  "    <div>\n" +
  "      <div class=\"form-group\">\n" +
  "        <p class=\"password-label\">{{ 'Minimum password requirements' | i18n }}</p>\n" +
  "        <ul class=\"list-unstyled password-strength\">\n" +
  "          <li id=\"eight-chars\" ng-class=\"{valid: eightCharsState === 'valid', invalid: eightCharsState === 'invalid', 'default': eightCharsState === 'default'}\">{{ 'At least 8 characters' | i18n }}</li>\n" +
  "          <li id=\"one-each-case\" ng-class=\"{valid: oneEachCaseState === 'valid', invalid: oneEachCaseState === 'invalid', 'default': oneEachCaseState === 'default'}\">{{ 'At least 1 upper and lower case character' | i18n }}</li>\n" +
  "          <li id=\"one-number\" ng-class=\"{valid: oneNumberState === 'valid', invalid: oneNumberState === 'invalid', 'default': oneNumberState === 'default'}\">{{ 'At least 1 number' | i18n }}</li>\n" +
  "        </ul>\n" +
  "      </div>\n" +
  "      <div class=\"form-group half-width\">\n" +
  "        <label for=\"value\">{{ 'Set a Password' | i18n }}</label>\n" +
  "        <input ng-model=\"password.value\" ng-change=\"checkPasswordStrength(); checkPasswordsMatch(false);\" ng-blur=\"checkPasswordStrength(true); checkPasswordsMatch(true);\" type=\"password\" class=\"form-control\" name=\"value\" autocomplete=\"off\" autofocus=\"true\" tabindex=\"1\" required>\n" +
  "      </div>\n" +
  "      <div class=\"form-group half-width\">\n" +
  "        <label for=\"confirmValue\">{{ 'Confirm your password' | i18n }}</label>\n" +
  "        <input ng-model=\"password.confirmValue\" ng-change=\"checkPasswordsMatch(false)\" ng-blur=\"checkPasswordsMatch(true)\"  type=\"password\" class=\"form-control\" name=\"confirmValue\" autocomplete=\"off\" tabindex=\"2\" required>\n" +
  "      </div>\n" +
  "      <div class=\"cta-links clearfix\">\n" +
  "        <button ng-click=\"submitResetRequest()\" ng-disabled=\"sendingRequest || !password.value || !password.confirmValue || !passwordsMatch || form.password.$error.passwordsMustMatch\" class=\"reset-password btn btn-primary hidden-xs-login\" type=\"button\" tabindex=\"3\">{{ 'Submit' | i18n }}</button>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "  </form>\n" +
  "</div>\n" +
  "");
}]);

angular.module("signin-modal.html", []).run(["$templateCache", function($templateCache) {
 $templateCache.put("signin-modal.html",
  "<div class=\"modal-header\">\n" +
  "  <button ng-click=\"close()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
  "  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.enterUid || currentState === MODALSTATE.enterPassword\">\n" +
  "    <button href=\"#\" ng-click=\"close()\" class=\"modal-title-left btn-link\">{{ 'Cancel' | i18n }}</button>\n" +
  "    <span class=\"modal-title-center\">{{ 'Sign in to Webmaker' | i18n }}</span>\n" +
  "    <button ng-show=\"currentState === MODALSTATE.enterUid\"\n" +
  "      ng-disabled=\"sendingRequest\"\n" +
  "      ng-click=\"submitUid()\"\n" +
  "      class=\"modal-title-right btn-link\">{{ 'Next' | i18n }}</button>\n" +
  "    <button ng-show=\"currentState === MODALSTATE.enterPassword\"\n" +
  "      class=\"modal-title-right btn-link\"\n" +
  "      ng-disabled=\"sendingRequest\"\n" +
  "      ng-click=\"user.password && submitPassword()\" tabindex=\"9\">{{ 'Submit' | i18n }}</button>\n" +
  "  </h3>\n" +
  "  <h3 class=\"modal-title\" ng-show=\"currentState === MODALSTATE.checkEmail || currentState === MODALSTATE.resetRequestSent || currentState === MODALSTATE.enterKey\">\n" +
  "    <a href=\"#\" ng-click=\"close()\" class=\"modal-title-left\">{{ 'Cancel' | i18n }}</a>\n" +
  "    <span class=\"modal-title-center\">{{ 'checkEmail' | i18n }}</span>\n" +
  "    <button\n" +
  "      ng-show=\"currentState === MODALSTATE.enterKey\"\n" +
  "      ng-disabled=\"sendingRequest\"\n" +
  "      ng-click=\"user.key && submitKey()\"\n" +
  "      tabindex=\"7\"\n" +
  "      class=\"submit-userid modal-title-right btn-link\">{{ 'Next' | i18n }}</button>\n" +
  "    <a\n" +
  "      class=\"modal-title-right\"\n" +
  "      ng-show=\"currentState === MODALSTATE.checkEmail\"\n" +
  "      ng-click=\"enterKey()\"\n" +
  "      tabindex=\"4\">{{ 'Next' | i18n }}</a>\n" +
  "    <a href=\"#\"\n" +
  "      ng-show=\"currentState === MODALSTATE.resetRequestSent\"\n" +
  "      ng-click=\"close()\" class=\"modal-title-right\">{{ 'Done' | i18n }}</a>\n" +
  "  </h3>\n" +
  "</div>\n" +
  "<div class=\"modal-body\">\n" +
  "  <form class=\"form\" name=\"form.user\" novalidate>\n" +
  "    <div class=\"alert alert-success\" ng-show=\"passwordWasReset && currentState === MODALSTATE.enterUid\" ng-bind-html=\"'Password Reset Success' | i18n\"></div>\n" +
  "    <div class=\"alert alert-danger\" ng-show=\"expiredLoginLink && currentState === MODALSTATE.enterUid\" ng-bind-html=\"'Expired Login Link' | i18n\"></div>\n" +
  "    <div class=\"alert alert-danger\" ng-show=\"form.user.$error.resetRequestFailed\" ng-bind-html=\"'resetRequestFailed' | i18n\"></div>\n" +
  "\n" +
  "    <!-- Enter uid -->\n" +
  "    <div ng-show=\"currentState === MODALSTATE.enterUid;\">\n" +
  "      <div class=\"form-group\">\n" +
  "        <label for=\"uid\">{{ 'EmailOrUsername' | i18n }}</label>\n" +
  "        <input name=\"uid\" class=\"form-control\" ng-model=\"user.uid\" autocomplete=\"on\" required tabindex=\"1\" autofocus=\"true\" focus-on=\"login-uid\" ng-keyup=\"$event.keyCode === 13 && !sendingRequest && submitUid()\">\n" +
  "      </div>\n" +
  "      <div class=\"alert alert-warning\" ng-show=\"form.user.$error.noAccount\" bind-trusted-html=\"'No account found for your uid' | i18n\"></div>\n" +
  "      <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidUid\" ng-bind-html=\"'That does not look like an email address or username' | i18n\"></div>\n" +
  "      <div class=\"cta-links clearfix\">\n" +
  "        <button class=\"submit-userid btn btn-primary hidden-xs-login\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"submitUid()\" tabindex=\"2\">{{ 'Sign in' | i18n }}</button>\n" +
  "        <div ng-hide=\"disablePersona\">\n" +
  "          <p class=\"align-left\">{{ 'or' | i18n }}</p>\n" +
  "          <button type=\"button\" wm-persona-login class=\"btn btn-link\" ng-disabled=\"sendingRequest\" ng-click=\"usePersona();\" tabindex=\"3\">{{ 'log in with Persona' | i18n }}</button>\n" +
  "        </div>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "    <!-- end enter uid -->\n" +
  "\n" +
  "    <!-- checkEmail begins -->\n" +
  "    <div class=\"checkEmail\" ng-show=\"currentState === MODALSTATE.checkEmail\">\n" +
  "      <div class=\"mailIcon clearfix\">\n" +
  "        <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
  "        <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n" +
  "            <title>Mail Icon</title>\n" +
  "            <desc></desc>\n" +
  "            <defs></defs>\n" +
  "            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
  "              <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n" +
  "                <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n" +
  "                    <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n" +
  "                    <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n" +
  "                    <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                </g>\n" +
  "              </g>\n" +
  "            </g>\n" +
  "        </svg>\n" +
  "        <p>{{ 'tokenMessage' | i18n }}</p>\n" +
  "      </div>\n" +
  "      <div class=\"enter-key hidden-xs-login\">\n" +
  "        <a ng-click=\"enterKey()\" tabindex=\"4\" ng-bind-html=\"'Enter key' | i18n\"></a>\n" +
  "      </div>\n" +
  "      <hr>\n" +
  "      <footer class=\"help-footer\">\n" +
  "        <p ng-bind-html=\"'trouble with email' | i18n\"></p>\n" +
  "      </footer>\n" +
  "    </div>\n" +
  "    <!-- checkEmail ends -->\n" +
  "\n" +
  "    <!-- enterToken begins -->\n" +
  "    <div class=\"enterToken\" ng-show=\"currentState === MODALSTATE.enterKey\">\n" +
  "      <div class=\"email-container\">\n" +
  "        <div class=\"mailIcon text-center\">\n" +
  "          <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
  "          <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n" +
  "              <title>Mail Icon</title>\n" +
  "              <desc></desc>\n" +
  "              <defs></defs>\n" +
  "              <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
  "                  <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n" +
  "                      <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n" +
  "                          <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n" +
  "                          <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n" +
  "                          <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                          <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                      </g>\n" +
  "                  </g>\n" +
  "              </g>\n" +
  "          </svg>\n" +
  "        </div>\n" +
  "        <div class=\"key-group\">\n" +
  "          <div class=\"form-group\">\n" +
  "            <label for=\"key\" ng-show=\"!verified\">{{ 'Visit Email' | i18n }}</label>\n" +
  "            <label for=\"key\" ng-show=\"verified\">{{ 'Verified Visit Email' | i18n }}</label>\n" +
  "            <input ng-model=\"user.key\" name=\"key\" class=\"form-control\" type=\"text\" required tabindex=\"6\" focus-on=\"enter-key\" ng-keyup=\"$event.keyCode === 13 && user.key && !sendingRequest && submitKey()\">\n" +
  "          </div>\n" +
  "          <div class=\"alert alert-danger\" ng-show=\"form.user.$error.tokenSendFailed\" ng-bind-html=\"'problem sending token' | i18n\"></div>\n" +
  "          <div class=\"alert alert-danger\" ng-show=\"form.user.$error.invalidKey\" ng-bind-html=\"'incorrectToken' | i18n\"></div>\n" +
  "          <div class=\"remember-me-token checkbox\">\n" +
  "            <input id=\"remember-me-token\" ng-model=\"user.rememberMe\" type=\"checkbox\" name=\"rememberMe\" tabindex=\"7\">\n" +
  "            <label for=\"remember-me-token\" tabindex=\"7\">\n" +
  "              <div><span></span></div>\n" +
  "              <span ng-bind-html=\"'Remember me for one year' | i18n\"></span>\n" +
  "            </label>\n" +
  "          </div>\n" +
  "          <button type=\"button\" class=\"hidden-xs-login submit-userid btn btn-primary\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"user.key && submitKey()\" tabindex=\"8\">{{ 'Submit' | i18n }}</button>\n" +
  "        </div>\n" +
  "      </div>\n" +
  "      <hr>\n" +
  "      <footer class=\"help-footer\">\n" +
  "        <p ng-bind-html=\"'trouble with email' | i18n\"></p>\n" +
  "      </footer>\n" +
  "    </div>\n" +
  "    <!-- enterToken ends -->\n" +
  "\n" +
  "    <div class=\"enterPassword\" ng-show=\"currentState === MODALSTATE.enterPassword\">\n" +
  "      <div class=\"password-container\">\n" +
  "        <div class=\"form-group\">\n" +
  "          <label for=\"password\">{{ 'Password' | i18n }}</label>\n" +
  "          <input type=\"password\" class=\"form-control\" required name=\"password\" ng-model=\"user.password\" tabindex=\"9\" focus-on=\"enter-password\" ng-keyup=\"$event.keyCode === 13 && user.password && !sendingRequest && submitPassword()\">\n" +
  "        </div>\n" +
  "        <div class=\"alert alert-danger\" ng-show=\"form.user.$error.passwordSigninFailed\" ng-bind-html=\"'passLoginFailed' | i18n\"></div>\n" +
  "        <div class=\"remember-me-password checkbox\">\n" +
  "          <input id=\"remember-me-password\" ng-model=\"user.rememberMe\" type=\"checkbox\" name=\"rememberMe\" tabindex=\"10\">\n" +
  "          <label for=\"remember-me-password\" tabindex=\"10\">\n" +
  "            <div><span></span></div>\n" +
  "            <span ng-bind-html=\"'Remember me for one year' | i18n\"></span>\n" +
  "          </label>\n" +
  "        </div>\n" +
  "        <div class=\"cta-links clearfix\">\n" +
  "          <button type=\"button\" class=\"submit-password btn btn-primary hidden-xs-login\" type=\"button\" ng-disabled=\"sendingRequest\" ng-click=\"user.password && submitPassword()\" tabindex=\"11\">{{ 'Submit' | i18n }}</button>\n" +
  "          <p><a ng-click=\"requestReset()\">{{ 'Forgot your password?' | i18n }}</a></p>\n" +
  "        </div>\n" +
  "      </div>\n" +
  "      <hr>\n" +
  "      <footer class=\"help-footer\">\n" +
  "        <p class=\"switch-back\">{{ 'you can switch to webmaker login' | i18n }}</p>\n" +
  "      </footer>\n" +
  "    </div>\n" +
  "\n" +
  "    <div class=\"resetRequestSent\" ng-show=\"currentState === MODALSTATE.resetRequestSent\">\n" +
  "      <div class=\"mailIcon clearfix\">\n" +
  "        <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n" +
  "        <svg width=\"94px\" height=\"94px\" viewBox=\"0 0 94 94\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n" +
  "            <title>Mail Icon</title>\n" +
  "            <desc></desc>\n" +
  "            <defs></defs>\n" +
  "            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n" +
  "              <g id=\"AC4\" sketch:type=\"MSArtboardGroup\" transform=\"translate(-126.000000, -92.000000)\">\n" +
  "                <g id=\"Mail-Icon\" sketch:type=\"MSLayerGroup\" transform=\"translate(126.000000, 92.000000)\">\n" +
  "                    <circle id=\"Oval-1\" fill=\"#3FB58E\" sketch:type=\"MSShapeGroup\" cx=\"47\" cy=\"47\" r=\"47\"></circle>\n" +
  "                    <rect id=\"Rectangle-1\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\" x=\"18\" y=\"27\" width=\"59\" height=\"41\" rx=\"3\"></rect>\n" +
  "                    <path d=\"M21.0069321,27 C19.3462494,27 17.9900756,28.3368135 17.9778938,29.9953973 C17.9778938,29.9953973 17.9712616,30.8538058 17.9707031,31.0256348 C17.9688241,31.6037734 44.3277476,50.7739169 44.3277476,50.7739169 C45.6547338,51.7409595 47.981989,52.0459954 49.4771883,51.3411914 C49.4771883,51.3411914 52.3180561,50.8603167 59.4023438,44.0800781 C61.1871084,42.3719134 77.0395508,31.2178814 77.0395508,30.1010742 C77.0395508,29.644898 77.0391066,29.9910722 77.0391066,29.9910722 C77.0175086,28.3391486 75.6568485,27 73.9930679,27 L21.0069321,27 Z\" id=\"Rectangle-95\" fill=\"#F3F3F3\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                    <path d=\"M17.7634277,31.0032813 L46.7917565,50.276875 L75.0556641,31.3201563 L46.5782176,55.1035938 L17.7634277,31.0032813 Z\" id=\"Path-1\" fill=\"#D8D8D8\" sketch:type=\"MSShapeGroup\"></path>\n" +
  "                </g>\n" +
  "              </g>\n" +
  "            </g>\n" +
  "        </svg>\n" +
  "        <p>{{ 'resetMessage' | i18n }}</p>\n" +
  "      </div>\n" +
  "      <hr>\n" +
  "        <footer class=\"help-footer\">\n" +
  "          <p class=\"switch-back\">{{ 'you can switch to webmaker login' | i18n }}</p>\n" +
  "        </footer>\n" +
  "    </div>\n" +
  "  </form>\n" +
  "</div>\n" +
  "");
}]);
