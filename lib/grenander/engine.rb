require 'font-awesome-sass'

module Grenander
  class Engine < ::Rails::Engine
    isolate_namespace Grenander

    config.to_prepare do
      # Make the implementing application's helpers available to the engine.
      Grenander::ApplicationController.helper Rails.application.helpers
    end
    
  end
end
