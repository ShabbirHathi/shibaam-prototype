import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const Profile = () => {
  const { user } = useUser();

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">Profile</h1>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-2xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">Member since {user ? new Date(user.createdAt).getFullYear() : ''}</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" />Edit Profile
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">
              {user?.address ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}` : 'Not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
