import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration: Component: gh-progress-bar', function() {
    setupComponentTest('gh-progress-bar', {
        integration: true
    });

    it('renders', function() {
        // Set any properties with this.set('myProperty', 'value');
        // Handle any actions with this.on('myAction', function(val) { ... });
        // Template block usage:
        // this.render(hbs`
        //   {{#gh-progress-bar}}
        //     template content
        //   {{/gh-progress-bar}}
        // `);

        this.render(hbs`{{gh-progress-bar}}`);
        expect(this.$()).to.have.length(1);
    });
});
