module ActiveAdmin

  class ModalSection
    include ActiveAdmin::OptionalDisplay

    attr_accessor :name, :options, :block

    def initialize(name, options = {}, &block)
      @name, @options, @block = name, options, block
      normalize_display_options!
    end

    # The id gets used for the div in the view
    def id
      'modal_' + name.to_s.downcase.underscore
    end
    
    # can be text, ajax, or partial
    def method
      return 'partial' if options[:partial]
      return 'ajax' if self.href
      'text'
    end
    
    # return url for ajax-call, if given
    def href
      return options[:href] if options[:href] && options[:href] != ''
      return false
    end
    
    def modal_type
      'default'
    end

    def icon?
      options[:icon]
    end

    def icon
      options[:icon] if icon?
    end

    # The title gets displayed within the section in the view
    def title
      begin
        I18n.t!("active_admin.modals.#{name.to_s}")
      rescue I18n::MissingTranslationData
        name.to_s.titlecase
      end
    end

    # If a block is not passed in, the name of the partial to render
    def partial_name
      options[:partial] || "#{name.to_s.downcase.gsub(' ', '_')}_modal"
    end
  end

end
