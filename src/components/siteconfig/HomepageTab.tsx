import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import * as Icons from 'lucide-react';

// Available icons for features section (all verified Lucide React icons)
const AVAILABLE_ICONS = [
  // Shipping & Delivery
  'Truck', 'Package', 'ShoppingCart', 'ShoppingBag', 'Store',
  // Customer Support
  'Headphones', 'MessageCircle', 'Phone', 'Mail', 'HelpCircle',
  // Returns & Exchange
  'RotateCcw', 'RefreshCw', 'ArrowLeftRight', 'Repeat',
  // Security & Payment
  'Shield', 'ShieldCheck', 'Lock', 'Key', 'CreditCard',
  // Speed & Performance
  'Clock', 'Timer', 'Zap', 'TrendingUp', 'Activity',
  // Quality & Awards
  'Award', 'BadgeCheck', 'Medal', 'Trophy', 'Star',
  // Customer Satisfaction
  'Heart', 'ThumbsUp', 'Smile', 'Users', 'UserCheck',
  // Offers & Deals
  'Gift', 'Sparkles', 'Tag', 'Percent', 'DollarSign',
  // Location & Global
  'Globe', 'MapPin', 'Navigation2', 'Compass', 'Map',
  // Verification
  'Check', 'CheckCircle', 'CheckCircle2', 'CheckSquare',
  // Eco-Friendly
  'Leaf', 'Recycle', 'Sun', 'Moon', 'Droplet',
  // Business & Operations
  'Box', 'PackageOpen', 'Layers', 'Archive', 'Briefcase',
  'Home', 'Building', 'Building2', 'Factory'
];

interface SiteConfig {
  homepage?: {
    hotDealsSection?: {
      title: string;
      subtitle: string;
      enabled?: boolean;
      productIds?: string[];
    };
    featuresSection?: {
      title: string;
      subtitle: string;
      enabled?: boolean;
      features?: Array<{
        icon: string;
        title: string;
        description: string;
        image: string;
      }>;
    };
    testimonialSection?: {
      title: string;
      subtitle?: string;
      enabled?: boolean;
      layout?: 'model1' | 'model2';
      navigationLabels?: {
        previous: string;
        next: string;
      };
      testimonials?: Array<{
        name: string;
        role: string;
        rating: number;
        text: string;
        heading?: string;
        productImage?: string;
        productName?: string;
        productPrice?: string;
        productLink?: string;
      }>;
    };
    featuredCollections?: {
      title: string;
      enabled?: boolean;
      collections?: Array<{
        id: number;
        title: string;
        subtitle: string;
        description: string;
        image: string;
        buttonText: string;
        buttonLink: string;
        gradient: string;
      }>;
    };
  };
}

interface HomepageTabProps {
  config: SiteConfig;
  updateConfig: (path: string, value: any) => void;
  addArrayItem: (path: string, item: any) => void;
  removeArrayItem: (path: string, index: number) => void;
  setProductSelectorOpen: (open: boolean) => void;
  setPickerTarget: (target: string) => void;
  setPickerOpen: (open: boolean) => void;
}

const HomepageTab: React.FC<HomepageTabProps> = ({
  config,
  updateConfig,
  addArrayItem,
  removeArrayItem,
  setProductSelectorOpen,
  setPickerTarget,
  setPickerOpen
}) => (
  <div className="space-y-8">
    {/* Hot Deals Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Hot Deals Section</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hotdeals-enabled"
            checked={config.homepage?.hotDealsSection?.enabled !== false}
            onChange={(e) => updateConfig('homepage.hotDealsSection.enabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hotdeals-enabled" className="text-sm font-medium text-foreground">
            Enable Section
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Title</label>
          <Input
            value={config.homepage?.hotDealsSection?.title || ''}
            onChange={(e) => updateConfig('homepage.hotDealsSection.title', e.target.value)}
            placeholder="Hot Deals"
            disabled={config.homepage?.hotDealsSection?.enabled === false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
          <Input
            value={config.homepage?.hotDealsSection?.subtitle || ''}
            onChange={(e) => updateConfig('homepage.hotDealsSection.subtitle', e.target.value)}
            placeholder="Don't miss these amazing offers"
            disabled={config.homepage?.hotDealsSection?.enabled === false}
          />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">Assigned Products</label>
          <Button
            onClick={() => setProductSelectorOpen(true)}
            size="sm"
            className="flex items-center gap-2"
            disabled={config.homepage?.hotDealsSection?.enabled === false}
          >
            <Plus className="h-4 w-4" />
            Assign Products
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {config.homepage?.hotDealsSection?.productIds?.length || 0} products assigned to hot deals
        </div>
        {(config.homepage?.hotDealsSection?.productIds?.length || 0) > 0 && (
          <div className="text-xs text-muted-foreground">
            Product IDs: {config.homepage?.hotDealsSection?.productIds?.join(', ') || ''}
          </div>
        )}
      </div>
    </div>

    {/* Features Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Features Section</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="features-enabled"
              checked={config.homepage?.featuresSection?.enabled !== false}
              onChange={(e) => updateConfig('homepage.featuresSection.enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="features-enabled" className="text-sm font-medium text-foreground">
              Enable Section
            </label>
          </div>
          <Button
            onClick={() => addArrayItem('homepage.featuresSection.features', {
              icon: '',
              title: '',
              description: '',
              image: ''
            })}
            size="sm"
            className="flex items-center gap-2"
            disabled={config.homepage?.featuresSection?.enabled === false}
          >
            <Plus className="h-4 w-4" />
            Add Feature
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Title</label>
          <Input
            value={config.homepage?.featuresSection?.title || ''}
            onChange={(e) => updateConfig('homepage.featuresSection.title', e.target.value)}
            placeholder="Why Choose Us"
            disabled={config.homepage?.featuresSection?.enabled === false}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Subtitle</label>
          <Input
            value={config.homepage?.featuresSection?.subtitle || ''}
            onChange={(e) => updateConfig('homepage.featuresSection.subtitle', e.target.value)}
            placeholder="Discover what makes us special"
            disabled={config.homepage?.featuresSection?.enabled === false}
          />
        </div>
      </div>
      <div className="space-y-4">
        {config.homepage?.featuresSection?.features?.map((feature, index) => (
          <div key={index} className="p-4 border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Feature Title</label>
                <Input
                  value={feature.title}
                  onChange={(e) => updateConfig(`homepage.featuresSection.features.${index}.title`, e.target.value)}
                  placeholder="Fast Shipping"
                  disabled={config.homepage?.featuresSection?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Icon</label>
                <div className="flex gap-2 items-center">
                  <select
                    value={feature.icon}
                    onChange={(e) => updateConfig(`homepage.featuresSection.features.${index}.icon`, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white [&>option]:bg-gray-800 [&>option]:text-white"
                    disabled={config.homepage?.featuresSection?.enabled === false}
                  >
                    <option value="" className="bg-gray-800 text-white">Select an icon...</option>
                    {AVAILABLE_ICONS.map(iconName => {
                      const IconComponent = Icons[iconName as keyof typeof Icons];
                      return (
                        <option key={iconName} value={iconName} className="bg-gray-800 text-white">
                          {iconName}
                        </option>
                      );
                    })}
                  </select>
                  {feature.icon && (() => {
                    const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{className?: string}> | undefined;
                    return IconComponent ? (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded border border-gray-600">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <Textarea
                value={feature.description}
                onChange={(e) => updateConfig(`homepage.featuresSection.features.${index}.description`, e.target.value)}
                placeholder="Get your orders delivered quickly and safely"
                rows={2}
                disabled={config.homepage?.featuresSection?.enabled === false}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-foreground mb-1">Feature Image URL <span className="text-xs text-gray-500">(Recommended: 400 x 400)</span></label>
              <div className="flex gap-2">
                <Input
                  value={feature.image}
                  onChange={(e) => updateConfig(`homepage.featuresSection.features.${index}.image`, e.target.value)}
                  placeholder="/images/feature.jpg"
                  disabled={config.homepage?.featuresSection?.enabled === false}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => { 
                    setPickerTarget(`homepage.featuresSection.features.${index}.image`); 
                    setPickerOpen(true); 
                  }}
                  disabled={config.homepage?.featuresSection?.enabled === false}
                >
                  Select
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => removeArrayItem('homepage.featuresSection.features', index)}
                variant="destructive"
                size="sm"
                disabled={config.homepage?.featuresSection?.enabled === false}
              >
                <Trash2 className="h-4 w-4" />
                Remove Feature
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Testimonials Section</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="testimonials-enabled"
              checked={config.homepage?.testimonialSection?.enabled !== false}
            onChange={(e) => updateConfig('homepage.testimonialSection.enabled', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="testimonials-enabled" className="text-sm font-medium text-foreground">
            Enable Section
          </label>
        </div>
        <Button
          onClick={() => addArrayItem('homepage.testimonialSection.testimonials', {
            name: '',
            role: '',
            rating: 5,
            text: '',
            heading: '',
            productImage: '',
            productName: '',
            productPrice: '',
            productLink: ''
          })}
          size="sm"
          className="flex items-center gap-2"
          disabled={config.homepage?.testimonialSection?.enabled === false}
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Section Title</label>
        <Input
          value={config.homepage?.testimonialSection?.title || ''}
          onChange={(e) => updateConfig('homepage.testimonialSection.title', e.target.value)}
          placeholder="What Our Customers Say"
          disabled={config.homepage?.testimonialSection?.enabled === false}
        />
      </div>
      {/* Subtitle: only relevant for Model 2 */}
      {config.homepage?.testimonialSection?.layout !== 'model1' && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Section Subtitle <span className="text-xs text-muted-foreground">(Model 2 only)</span></label>
          <Input
            value={config.homepage?.testimonialSection?.subtitle || ''}
            onChange={(e) => updateConfig('homepage.testimonialSection.subtitle', e.target.value)}
            placeholder="See what our satisfied customers have to say about our electronic accessories."
            disabled={config.homepage?.testimonialSection?.enabled === false}
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Layout Model</label>
        <select
          value={config.homepage?.testimonialSection?.layout || 'model1'}
          onChange={(e) => updateConfig('homepage.testimonialSection.layout', e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground h-10"
          disabled={config.homepage?.testimonialSection?.enabled === false}
        >
          <option value="model1">Model 1: Classic Slider</option>
          <option value="model2">Model 2: Happy Clients Grid</option>
        </select>
      </div>
      {/* Nav labels: only relevant for Model 1 slider */}
      {config.homepage?.testimonialSection?.layout !== 'model2' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Prev Btn Label <span className="text-xs text-muted-foreground">(Model 1)</span></label>
            <Input
              value={config.homepage?.testimonialSection?.navigationLabels?.previous || ''}
              onChange={(e) => updateConfig('homepage.testimonialSection.navigationLabels.previous', e.target.value)}
              placeholder="Previous"
              disabled={config.homepage?.testimonialSection?.enabled === false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Next Btn Label <span className="text-xs text-muted-foreground">(Model 1)</span></label>
            <Input
              value={config.homepage?.testimonialSection?.navigationLabels?.next || ''}
              onChange={(e) => updateConfig('homepage.testimonialSection.navigationLabels.next', e.target.value)}
              placeholder="Next"
              disabled={config.homepage?.testimonialSection?.enabled === false}
            />
          </div>
        </div>
      )}
    </div>

    <div className="space-y-3">
      {config.homepage?.testimonialSection?.testimonials?.map((testimonial, index) => (
        <div key={index} className="p-4 border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Customer Name</label>
              <Input
                value={testimonial.name}
                onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.name`, e.target.value)}
                placeholder="John Doe"
                disabled={config.homepage?.testimonialSection?.enabled === false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Role/Title/Location</label>
              <Input
                value={testimonial.role}
                onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.role`, e.target.value)}
                placeholder="Customer from USA"
                disabled={config.homepage?.testimonialSection?.enabled === false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Rating (1-5)</label>
              <Input
                type="number"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.rating`, parseInt(e.target.value))}
                placeholder="5"
                disabled={config.homepage?.testimonialSection?.enabled === false}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-foreground mb-1">Testimonial Text</label>
            <Textarea
              value={testimonial.text}
              onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.text`, e.target.value)}
              placeholder="This product exceeded my expectations. Great quality and fast delivery!"
              rows={3}
              disabled={config.homepage?.testimonialSection?.enabled === false}
            />
          </div>

          {/* Conditional fields for Model 2 (Happy Clients Layout) */}
          {config.homepage?.testimonialSection?.layout === 'model2' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-3 border-t border-border">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">Review Heading (Model 2)</label>
                <Input
                  value={testimonial.heading || ''}
                  onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.heading`, e.target.value)}
                  placeholder="Best Online Fashion Site"
                  disabled={config.homepage?.testimonialSection?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Product Name (Model 2)</label>
                <Input
                  value={testimonial.productName || ''}
                  onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.productName`, e.target.value)}
                  placeholder="3-in-1 Wireless Charger"
                  disabled={config.homepage?.testimonialSection?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Product Price (Model 2)</label>
                <Input
                  value={testimonial.productPrice || ''}
                  onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.productPrice`, e.target.value)}
                  placeholder="$105.95"
                  disabled={config.homepage?.testimonialSection?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Product Link (Model 2)</label>
                <Input
                  value={testimonial.productLink || ''}
                  onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.productLink`, e.target.value)}
                  placeholder="/products/wireless-charger"
                  disabled={config.homepage?.testimonialSection?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Product Image URL (Model 2)</label>
                <div className="flex gap-2">
                  <Input
                    value={testimonial.productImage || ''}
                    onChange={(e) => updateConfig(`homepage.testimonialSection.testimonials.${index}.productImage`, e.target.value)}
                    placeholder="/images/product.jpg"
                    disabled={config.homepage?.testimonialSection?.enabled === false}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    type="button"
                    onClick={() => { 
                      setPickerTarget(`homepage.testimonialSection.testimonials.${index}.productImage`); 
                      setPickerOpen(true); 
                    }}
                    disabled={config.homepage?.testimonialSection?.enabled === false}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-3">
            <Button
              onClick={() => removeArrayItem('homepage.testimonialSection.testimonials', index)}
              variant="destructive"
              size="sm"
              disabled={config.homepage?.testimonialSection?.enabled === false}
            >
              <Trash2 className="h-4 w-4" />
              Remove Testimonial
            </Button>
          </div>
        </div>
      ))}
    </div>
    </div>

    {/* Featured Collections */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Featured Collections</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured-collections-enabled"
              checked={config.homepage?.featuredCollections?.enabled !== false}
              onChange={(e) => updateConfig('homepage.featuredCollections.enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured-collections-enabled" className="text-sm font-medium text-foreground">
              Enable Section
            </label>
          </div>
          <Button
            onClick={() => addArrayItem('homepage.featuredCollections.collections', {
              id: Date.now(),
              title: '',
              subtitle: '',
              description: '',
              image: '',
              buttonText: '',
              buttonLink: '',
              gradient: ''
            })}
            size="sm"
            className="flex items-center gap-2"
            disabled={config.homepage?.featuredCollections?.enabled === false}
          >
            <Plus className="h-4 w-4" />
            Add Collection
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-1">Section Title</label>
        <Input
          value={config.homepage?.featuredCollections?.title || ''}
          onChange={(e) => updateConfig('homepage.featuredCollections.title', e.target.value)}
          placeholder="Featured Collections"
          disabled={config.homepage?.featuredCollections?.enabled === false}
        />
      </div>
      <div className="space-y-4">
        {config.homepage?.featuredCollections?.collections?.map((collection, index) => (
          <div key={index} className="p-4 border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                <Input
                  value={collection.title}
                  onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.title`, e.target.value)}
                  placeholder="Collection Title"
                  disabled={config.homepage?.featuredCollections?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subtitle</label>
                <Input
                  value={collection.subtitle}
                  onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.subtitle`, e.target.value)}
                  placeholder="Collection Subtitle"
                  disabled={config.homepage?.featuredCollections?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Image URL <span className="text-xs text-gray-500">(Recommended: 1400 x 1600)</span></label>
                <div className="flex gap-2">
                  <Input
                    value={collection.image}
                    onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.image`, e.target.value)}
                    placeholder="/images/collection.jpg"
                    disabled={config.homepage?.featuredCollections?.enabled === false}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setPickerTarget(`homepage.featuredCollections.collections.${index}.image`); setPickerOpen(true); }}
                    disabled={config.homepage?.featuredCollections?.enabled === false}
                  >
                    Select
                  </Button>
                </div>
                {collection.image && (
                  <div className="mt-2">
                    <img
                      src={getImageUrl(collection.image)}
                      alt={`Collection ${index + 1}`}
                      className="w-24 h-24 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Button Text</label>
                <Input
                  value={collection.buttonText}
                  onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.buttonText`, e.target.value)}
                  placeholder="Shop Now"
                  disabled={config.homepage?.featuredCollections?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Button Link</label>
                <Input
                  value={collection.buttonLink}
                  onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.buttonLink`, e.target.value)}
                  placeholder="/collections/electronics"
                  disabled={config.homepage?.featuredCollections?.enabled === false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Gradient</label>
                <Input
                  value={collection.gradient}
                  onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.gradient`, e.target.value)}
                  placeholder="from-blue-500 to-purple-600"
                  disabled={config.homepage?.featuredCollections?.enabled === false}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <Textarea
                value={collection.description}
                onChange={(e) => updateConfig(`homepage.featuredCollections.collections.${index}.description`, e.target.value)}
                placeholder="Collection description"
                rows={2}
                disabled={config.homepage?.featuredCollections?.enabled === false}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => removeArrayItem('homepage.featuredCollections.collections', index)}
                variant="destructive"
                size="sm"
                disabled={config.homepage?.featuredCollections?.enabled === false}
              >
                <Trash2 className="h-4 w-4" />
                Remove Collection
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomepageTab;
