using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id = "e069461a-10cf-4abf-9930-d070b2a7e40f", Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole {Id = "ed2e9149-fa53-484c-a93f-bd33f9e9fcf6", Name = "Admin", NormalizedName = "ADMIN"}
            );
    }
}
