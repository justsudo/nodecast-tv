/**
 * Guide Page Controller
 */

class GuidePage {
    constructor(app) {
        this.app = app;
    }

    async init() {
        console.log('[Guide] Initializing EPG page...');
        
        // Ensure channels are loaded if not already
        if (!this.app.channelList.channels || this.app.channelList.channels.length === 0) {
            await this.app.channelList.loadSources();
            // We need channels for the EPG grid
            await this.app.channelList.loadAllChannels();
        }

        // Load EPG data
        await this.app.epgGuide.loadEpg();
    }

    async show() {
        // Ensure channel data is loaded before rendering EPG
        // This fixes a race condition where navigating directly to the Guide page
        // before visiting Live TV would result in an empty EPG.
        const channelList = this.app.channelList;
        if (!channelList.channels || channelList.channels.length === 0) {
            await channelList.loadSources();
            await channelList.loadChannels();
        }

        // Only load EPG data if not already loaded
        if (!this.app.epgGuide.programmes || this.app.epgGuide.programmes.length === 0) {
            await this.app.epgGuide.loadEpg();
        } else {
            // Just re-render with existing data (updates time position)
            this.app.epgGuide.render();
        }
    }

    hide() {
        // Page is hidden
    }
}

window.GuidePage = GuidePage;
