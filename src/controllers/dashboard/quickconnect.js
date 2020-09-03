import loading from 'loading';
import toast from 'toast';
import globalize from 'globalize';

/* eslint-disable indent */

    let page;
    export default function(view) {
        view.addEventListener('viewshow', function () {
            page = this;
            loading.show();
            page.querySelector('#btnQuickConnectSubmit').onclick = onSubmit;
            updatePage();
        });
    }

    function loadPage(status) {
        let available = status === 'Available' || status === 'Active';

        page.querySelector('#quickConnectStatus').textContent = status.toLocaleLowerCase();
        page.querySelector('#chkQuickConnectAvailable').checked = available;

        loading.hide();
    }

    function onSubmit() {
        loading.show();

        let newStatus = page.querySelector('#chkQuickConnectAvailable').checked ? 'Available' : 'Unavailable';

        let url = ApiClient.getUrl('/QuickConnect/Available?Status=' + newStatus);

        ApiClient.ajax({
            type: 'POST',
            url: url
        }, true).then(() => {
            toast(globalize.translate('SettingsSaved'));
            setTimeout(updatePage, 500);

            return true;
        }).catch((e) => {
            console.error('Unable to set quick connect status. error:', e);
        });

        loading.hide();
        return false;
    }

    function updatePage() {
        ApiClient.getQuickConnect('Status').then((response) => {
            loadPage(response);
            return true;
        }).catch((e) => {
            console.error('Unable to get quick connect status. error:', e);
        });
    }

/* eslint-enable indent */
