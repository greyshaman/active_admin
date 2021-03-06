module ActiveAdmin
  class Resource

    module Naming

      # Returns a name used to uniquely identify this resource
      # this should be an instance of ActiveAdmin:Resource::Name, which responds to
      # #singular, #plural, #route_key, #human etc.
      def resource_name
        custom_name = @options[:as] && @options[:as].gsub(/\s/,'')
        @resource_name ||= if custom_name || !resource_class.respond_to?(:model_name)
            Resource::Name.new(resource_class, custom_name)
          else
            Resource::Name.new(resource_class)
          end
      end

      # Returns the name to call this resource such as "Bank Account"
      def resource_label
        resource_name.human(:default => resource_name.gsub('::', ' ')).titleize
      end

      # Returns the plural version of this resource such as "Bank Accounts"
      def plural_resource_label
        resource_name.human(:count => 1.1, :default => resource_label.pluralize).titleize
      end
    end

    # A subclass of ActiveModel::Name which supports the different APIs presented
    # in Rails < 3.1 and > 3.1.
    class Name < ActiveModel::Name

      def initialize(klass, name = nil)
        
        unless name.nil?
          case name
          when Proc
            name = name.call
          else
            name = name.to_s
          end
        end
        
        if ActiveModel::Name.instance_method(:initialize).arity == 1
          super(proxy_for_initializer(klass, name))
        else
          super(klass, nil, name)
        end
      end

      def proxy_for_initializer(klass, name)
        return klass unless name
        return StringClassProxy.new(klass, name) if klass

        StringProxy.new(name)
      end

      def route_key
        plural
      end

      class StringProxy
        def initialize(name)
          @name = name
        end

        def name
          
          case @name
          when Proc
            @name.call
          else
            @name.to_s
          end
          
        end
      end

      class StringClassProxy < StringProxy
        delegate :lookup_ancestors, :i18n_scope, :to => :"@klass"

        def initialize(klass, name)
          @klass = klass || name
          super(name)
        end
      end

    end

  end
end
