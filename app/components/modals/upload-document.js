import injectService from 'ember-service/inject';
import {isEmpty} from 'ember-utils';
import ModalComponent from 'ghost-admin/components/modals/base';
import cajaSanitizers from 'ghost-admin/utils/caja-sanitizers';

export default ModalComponent.extend({
    model: null,
    submitting: false,

    url: '',
    text: '',
    newUrl: '',
    newText: '',
    initialFormType: 'upload',

    config: injectService(),
    notifications: injectService(),

    didReceiveAttrs() {
        let url = this.get('model.url');
        let text = this.get('model.text');
        let newUrl = typeof url === 'string' ? url : '';
        let formType = newUrl === '' ? 'upload' : 'url-input';

        this.set('url', newUrl);
        this.set('newUrl', newUrl);
        this.set('text', text);
        this.set('newText', text);
        this.set('initialFormType', formType);
    },

    // TODO: should validation be handled in the gh-image-uploader component?
    //  pro - consistency everywhere, simplification here
    //  con - difficult if the "save" is happening externally as it does here
    //
    //  maybe it should be handled at the model level?
    //      - automatically present everywhere
    //      - file uploads should always result in valid urls so it should only
    //        affect the url input form
    keyDown() {
        this._setErrorState(false);
    },

    _setErrorState(state) {
        if (state) {
            this.$('.url').addClass('error');
        } else {
            this.$('.url').removeClass('error');
        }
    },

    _validateUrl(url) {
        if (!isEmpty(url) && !cajaSanitizers.url(url)) {
            this._setErrorState(true);
            return {message: 'Image URI is not valid'};
        }

        return true;
    },
    // end validation

    actions: {
        fileUploaded(url, text) {
            this.set('url', url);
            this.set('newUrl', url);
            this.set('text', text);
            this.set('newText', text);
        },

        removeImage() {
            this.set('url', '');
            this.set('newUrl', '');
        },

        confirm() {
            let newUrl = this.get('newUrl');
            let newText = this.get('newText');
            let result = this._validateUrl(newUrl);

            if (result === true) {
                this.set('submitting', true);

                this.attrs.confirm(newUrl, newText);

                this.send('closeModal');
            }
        }
    }
});
